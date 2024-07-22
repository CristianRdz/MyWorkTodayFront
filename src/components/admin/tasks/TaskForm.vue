<template>
  <v-dialog v-model="visible" max-width="600px" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn :color="task ? 'blue' : 'green'" dark v-on="on" v-bind="attrs">
        <v-icon>{{ task ? 'mdi-pencil' : 'mdi-plus' }}</v-icon>
      </v-btn>
    </template>
    <v-form ref="form" @submit.prevent="saveTask">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ task ? 'Update' : 'Create' }} Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="taskNew.name"
                    :rules="requiredRules"
                    counter
                    hint="Task Name..."
                    label="Task Name"
                    name="name_task"
                    type="text"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="taskNew.description"
                    counter
                    hint="Description..."
                    label="Description"
                    name="description"
                    type="text"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="taskNew.date_time_start"
                    :rules="validateDateStart"
                    hint="Date Time Start..."
                    label="Date Time Start"
                    name="date_time_start"
                    type="datetime-local"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="taskNew.date_time_end"
                    :rules="validateDateStart"
                    hint="Date Time End..."
                    label="Date Time End"
                    name="date_time_end"
                    type="datetime-local"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                    v-model="taskNew.id_user_assigned"
                    :items="users"
                    item-text="full_name"
                    item-value="id_user"
                    label="User Assigned"
                    name="id_user_assigned"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                    v-model="taskNew.fk_project"
                    :items="projects"
                    item-text="name_project"
                    item-value="id_project"
                    label="Project"
                    name="fk_project"
                ></v-select>
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

import UsersService from "@/services/UsersServices";
import TaskService from "@/services/TaskService";
import ProjectsService from "@/services/ProjectsService";

export default {
  props: {
    visible: Boolean,
    task: Object,
    fetch: Function,
  },
  data() {
    return {
      loading: false,
      /* //{
       "id_task": "3c888cbc-eab6-4d3e-8983-0ea30a768b21",
       "name": "aute in enim elit velit",
       "description": "esse enim voluptate magna aliqua",
       "date_time_start": "1974-03-08T11:55:50",
       "date_time_end": "1974-04-23T13:45:53",
       "active": 1,
       "finished": 0,
       "id_user_assigned": "v2345678-90bc-1def-g234-567890bcdefg",
       "fk_project": "2f863b3c-4e6f-5g33-9504-3g7fcedeed0b"
     }*/
      taskNew: {
        id_task: null,
        name: '',
        description: '',
        date_time_start: '',
        date_time_end: '',
        active: true,
        finished: false,
        id_user_assigned: '',
        fk_project: '',
      },
      users: [],
      projects: [],

      requiredRules: [
        (v) => !!v || "Required field",
      ],
    };
  },
  methods: {
    validateDateStart() {
      const today = new Date().toISOString().slice(0, 10);
      if (this.taskNew.date_time_start < today) {
        return "Start date cannot be earlier than today.";
      }
      if (this.taskNew.date_time_end && this.taskNew.date_time_start > this.taskNew.date_time_end) {
        return "Start date cannot be later than the finish date.";
      }
      return true;
    },
    loadTask() {
      if (this.task) {
        this.taskNew = {
          id_task: this.task.id_task,
          name: this.task.name,
          description: this.task.description,
          date_time_start: this.task.date_time_start,
          date_time_end: this.task.date_time_end,
          active: this.task.active,
          finished: this.task.finished,
          id_user_assigned: this.task.id_user_assigned,
          fk_project: this.task.fk_project,
        };
      }
    },
    async close() {
      this.visible = false;
      this.taskNew = {
        id_task: null,
        name: '',
        description: '',
        date_time_start: '',
        date_time_end: '',
        active: true,
        finished: false,
        id_user_assigned: '',
        fk_project: '',
      };


    },
    async saveTask() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        if (this.task) {
          await TaskService.update(this.taskNew)
        } else {
          await TaskService.insert(this.taskNew)
        }
        this.loading = false;
        await this.close();
        await this.fetch();
      }
    },

    async fetchUsers() {
      this.loading = true;
      this.users = await UsersService.getUsers();
      this.loading = false;
    },
    async fetchProjects() {
      this.loading = true;
      this.projects = await ProjectsService.getProjects();
      this.loading = false;
    },

  },
  async mounted() {
    this.loadTask();
    await this.fetchUsers();
    await this.fetchProjects();
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.loadTask();
      }
    }
  },
};
</script>
