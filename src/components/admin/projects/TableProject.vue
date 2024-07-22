<template>
  <v-card>
    <v-card-title>
      Projects
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
          v-model="searchProjects"
          append-icon="mdi-magnify"
          hide-details
          label="Buscar"
          single-line
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-data-table
        :footer-props="{
          showFirstLastPage: true,
          'items-per-page-text': 'Items por página',
          'items-per-page-all-text': 'Todos',
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :headers="headers"
        :items="projects"
        :items-per-page-options="[5, 10, 15]"
        :loading="loading"

        class="mx-auto"
        style="height: auto; max-height: 500px; overflow-y: auto"

    >
      <template v-slot:item="{ item }">

        <tr>
          <td class="text-start">{{ item.name_project }}</td>
          <td class="text-start">{{ item.description }}</td>

          <td class="text-start">
            <v-chip :color="item.active ? 'green' : 'red'" outlined small>{{
                item.active ? "Activo" : "Inactivo"
              }}
            </v-chip>
          </td>
          <td class="text-center">
            <v-icon color="blue" @click="editItemProjects(item.id_project)">
              mdi-pencil
            </v-icon>
            <v-icon color="red" @click="deleteItemProjects(item.id_project)"
            >mdi-delete
            </v-icon
            >
          </td>
        </tr>
      </template>
    </v-data-table>
    <ProjectForm
        :visible="dialogFormProject"
        :openClose="openCloseDialog"
        :project="idProjects"
    ></ProjectForm>
  </v-card>
</template>

<script>
import ProjectsService from "@/services/ProjectsService";
import swalService from "@/services/SwalService";
import moment from "moment";
import ProjectForm from "@/components/admin/projects/ProjectForm.vue";


export default {
  components: {ProjectForm},
  data() {
    return {
      loading: false,
      searchProjects: "",
      idProjects: null,


      headers: [
        {
          text: "Project Name",
          align: "start",
          sortable: false,
          value: "name_project",
        },
        {
          text: "Description",
          align: "start",
          sortable: false,
          value: "description",
        },
        {
          text: "Active",
          align: "start",
          sortable: false,
          value: "active",
        },
        {
          text: "Acctions",
          align: "center",
          sortable: false,
          value: "acciones",
        },
      ],
      projects: [],
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
      itemsPerPage: 10,
      dialogFormProject: false,
    };
  },

  methods: {
    openCloseDialog() {
      this.dialogFormProject = !this.dialogFormProject;
    },
    async editItemProjects(idProjects) {
      this.idProjects = idProjects;
      this.openCloseDialog();

      this.idProjects = null;
    },
    async findItemProject(idProjects) {
      return this.projects.find((project) => project.id_project === idProjects);
    },

    formatDateTime(date) {
      return moment(date).format("DD/MM/YYYY HH:mm");
    },
    async deleteItemProjects(idProjects) {
      const result = await swalService.confirmationWarning(
          "¿Estás seguro de eliminar este evento?"
      );
      if (result.isConfirmed) {
        await ProjectsService.deleteProject(idProjects);
        await this.getAllProjects();
      }
    },
    async getAllProjects() {
      this.loading = true;
      this.projects = await ProjectsService.getProjects();
      this.loading = false;
    },
  },
  mounted() {
    this.getAllProjects();
  },
};
</script>
