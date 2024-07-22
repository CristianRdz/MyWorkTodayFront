<template>
  <v-dialog v-model="visible" max-width="600px" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="green" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-form ref="form" @submit.prevent="saveProject">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ project ? 'Update' : 'Create' }} Project</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="projectNew.name_project"
                    :rules="requiredRules"
                    counter
                    hint="Project Name..."
                    label="Project Name"
                    name="name_project"
                    type="text"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="projectNew.description"
                    counter
                    hint="Description..."
                    label="Description"
                    name="description"
                    type="text"
                ></v-text-field>
              </v-col>


            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="openClose"> Cancelar</v-btn>
          <v-btn
              color="green"
              text
              type="submit"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>

import ProjectsService from "@/services/ProjectsService";

export default {
  props: {
    visible: Boolean,
    openClose: Function,
    project: Object,
    findProjects: Function,
  },
  data() {
    return {
      projectNew: {
        name_project: '',
        description: '',
        active: true,
        id_project: null,
      },

      requiredRules: [
        (v) => !!v || "Campo requerido",
      ],
    };
  },
  methods: {
    loadProject() {
      if (this.project) {
        this.projectNew = this.findProjects(this.project.id_project);
        console.log(this.projectNew);
      }
    },
    async saveProject() {
      if (this.$refs.form.validate()) {
        if (this.project) {
          await ProjectsService.update(this.projectNew)
        } else {
          await ProjectsService.insert(this.projectNew)
        }
        this.openClose();
      }
    },

  },
  mounted() {
    this.loadProject();
  },
};
</script>
