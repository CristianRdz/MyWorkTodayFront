<template>
  <v-dialog v-model="visible" max-width="600px" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn :color="project ? 'blue' : 'green'" dark v-on="on" v-bind="attrs">
        <v-icon>{{ project ? 'mdi-pencil' : 'mdi-plus' }}</v-icon>
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
          <v-btn
              :disabled="this.loading"
              color="red" text @click="close"> Cancel
          </v-btn>
          <v-btn
              :loading="this.loading"
              color="green"
              text
              type="submit"
          >
            Save
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
    project: Object,
    fetch: Function,
  },
  data() {
    return {
      loading: false,
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
        this.projectNew = {
          name_project: this.project.name_project,
          description: this.project.description,
          active: this.project.active,
          id_project: this.project.id_project,
        };
      }
    },
    async close() {
      this.visible = false;
      this.projectNew = {
        name_project: '',
        description: '',
        active: true,
        id_project: null,
      };
    },
    async saveProject() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        if (this.project) {
          await ProjectsService.update(this.projectNew)
        } else {
          await ProjectsService.insert(this.projectNew)
        }
        this.loading = false;
        await this.fetch();
        await this.close();
      }
    },

  },
  mounted() {
    this.loadProject();
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.loadProject();
      }
    }
  },
};
</script>
