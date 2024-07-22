<template>
  <v-card>
    <v-card-title color-te>
      Users
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" hide-details label="Buscar" single-line></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn class="mb-2" color="green" dark v-on="on">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-form ref="formAgregar" @submit.prevent="addUsuario">
            <v-card-title>
              <span class="text-h5">Agregar nuevo usuario</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="nuevoUsuario.full_name"
                                  :rules="[v => !!v || 'Ingrese el nombre', v => v.length <= 30 && v.length >=3 || 'El nombre debe de tener entre 3 y 30 caracteres']"
                                  label="Nombres"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="nuevoUsuario.email"
                                  :rules="[v => !!v || 'Ingrese el email', v => /.+@.+\..+/.test(v) || 'Ingrese un email válido']"
                                  label="Correo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-select v-model="nuevoUsuario.fk_rol" :items="roles"
                              :rules="[v => !!v || 'Seleccione un rol']" item-text="name"
                              item-value="id_rol" label="Rol">
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="closeModalAddUsuario">Cancel</v-btn>
              <v-btn color="green darken-1" text type="submit">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>

      </v-dialog>
    </v-card-title>
    <v-data-table
        :footer-props="{
          showFirstLastPage: true,
          'items-per-page-text': 'Items por página',
          'items-per-page-all-text': 'Todos',
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :headers="headers"

        :items="users"
        :loading="loading"
        :search="search"
        class="mx-auto"
        style="height: auto; max-height: 500px; overflow-y: auto"

    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.full_name }}</td>
          <td class="text-start">{{ item.email }}</td>
          <td class="text-start">
            <v-chip :color="item.active ? 'green' : 'red'" outlined small @click="changeStatus(item.id_user)">
              {{ item.active ? 'Activo' : 'Inactivo' }}
            </v-chip>
          </td>
          <td class="text-start">
            {{ (roles.find(role => role.id_rol === item.fk_rol) || {}).name }}
          </td>
          <td class="text-center">
            <v-btn class="m-1" color="blue" @click="editItem(item)">
              <v-icon color="white" @click="editItem(item)">mdi-pencil</v-icon>
            </v-btn>
            <v-btn
                :loading="loading"
                class="m-1"
                   color="red" @click="deleteUser(item.id_user)">
              <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="editDialog" max-width="500px">
      <v-form ref="formEditar" @submit.prevent="saveEdit">
        <v-card>
          <v-card-title>
            <span class="text-h5">Editar Usuario</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="usuarioEditado.full_name"
                                :rules="[v => !!v || 'Ingrese el nombre', v => v.length <= 30 && v.length >=3 || 'El nombre debe de tener entre 3 y 30 caracteres']"
                                label="Nombres"
                  ></v-text-field>
                </v-col>

              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="cancelEdit">Cancel</v-btn>
            <v-btn :loading="loading"
                   color="green darken-1" text type="submit">Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

  </v-card>
</template>

<script>
import usersServices from '../../../services/UsersServices'
import rolesService from '../../../services/RolesService'
import moment from 'moment'
import swalService from "@/services/SwalService";
import ProjectsService from "@/services/ProjectsService";

export default {
  data() {
    return {
      passwordRules: [
        v => !!v || 'la contraseña es requerida',
        v => (v && v.length >= 8) || 'Minimo 8 caracteres',
        v => (v && /[A-Z]/.test(v)) || 'Al menos una letra mayúscula',
        v => (v && /[a-z]/.test(v)) || 'Al menos una letra minúscula',
        v => /\d/.test(v) || 'Al menos un número',
        v => (v && !/\s/.test(v)) || 'No espacios en blanco',
        v => (v && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]+/.test(v)) || 'Al menos un caracter especial',
      ],
      loading: false,
      users: [],
      roles: [],
      search: '',
      dialog: false,
      editDialog: false,
      nuevoUsuario: {
        full_name: '',
        email: '',
        active: true,
        fk_rol: "",
      },
      usuarioEditado: {
        full_name: '',
        email: '',
        active: true,
        fk_rol: "",
      },
      headers: [
        {text: 'Nombres', align: 'start', sortable: true, value: 'full_name'},
        {text: 'Correo', align: 'start', sortable: false, value: 'email'},
        {text: 'Estado', align: 'start', sortable: false, value: 'active'},
        {text: 'Nombre del Rol', align: 'start', sortable: false, value: 'fk_rol'},
        {text: 'Acciones', sortable: false}
      ],
    }
  },
  async mounted() {
    await this.getUsers();
    await this.getRoles();
  },
  methods: {

    async getUsers() {
      try {
        this.loading = true;
        this.users = await usersServices.getUsers();
        this.loading = false;

      } catch (error) {
        console.log(error)
        this.loading = false;
      }
    },
    async getRoles() {
      try {
        this.roles = await rolesService.getRoles();
      } catch (error) {
        console.log(error)
      }
    },
    //NOT FOUND, THIS METHOD NOT EXIST IN THE API
    async changeStatus(id_user) {
      try {
        const result = await swalService.confirmationWarning(
            "Are you sure you want to change to disable this user?"
        );
        if (result) {
          this.loading = true;
          await usersServices.changeStatus(id_user);
          await this.getUsers();
          this.loading = false;
        }
      } catch (error) {
        console.log(error)
      }
    },
    closeModalAddUsuario() {
      this.nuevoUsuario = {
        full_name: '',
        email: '',
        active: 'true',
        fk_rol: "",
      }
      this.dialog = false;
    },

    async addUsuario() {
      try {
        if (this.$refs.formAgregar.validate()) {
          this.loading = true;
          await usersServices.insert(this.nuevoUsuario);
          await this.getUsers();
          this.dialog = false;
          this.loading = false;
          this.nuevoUsuario = {
            full_name: '',
            email: '',
            active: '1',
            fk_rol: "",
          }

        }
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    editItem(item) {
      this.usuarioEditado = {...item};
      this.editDialog = true;
    },
    cancelEdit() {
      this.editDialog = false;
      this.usuarioEditado = {
        full_name: '',
        email: '',
        active: '',
        fk_rol: "",
      }
    },
    async saveEdit() {
      try {
        if (this.$refs.formEditar.validate()) {
          await usersServices.update(this.usuarioEditado);
          await this.getUsers();
          this.editDialog = false;
          this.usuarioEditado = {
            full_name: '',
            email: '',
            active: '1',
            fk_rol: "",
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(id_user) {
      try {
        const result = await swalService.confirmationWarning(
            "Are you sure you want to delete this user?"
        );
        if (result) {
          this.loading = true;
          await usersServices.deleteUser(id_user);
          await this.getUsers();
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

  },
  watch: {
    search: async function (val) {
      if (val) {
        this.users = this.users.filter((item) => {
          return item.full_name.toLowerCase().includes(val.toLowerCase()) ||
              item.email.toLowerCase().includes(val.toLowerCase()) ||
              item.fk_rol.toLowerCase().includes(val.toLowerCase()) ||
              item.active.toString().toLowerCase().includes(val.toLowerCase())
        });
      } else {
        await this.getUsers();
      }
    }
  }
}
</script>