<template>
  <v-card>
    <v-card-title>
      Tasks
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
          v-model="searchTasks"
          append-icon="mdi-magnify"
          hide-details
          label="Search..."
          single-line
      ></v-text-field>
      <v-spacer></v-spacer>
      <task-form
          :visible="dialogFormTask"
          :loading="loading"
          :fetch="getAllTasks"
          :task="null"
      ></task-form>
    </v-card-title>


    <v-data-table
        :footer-props="{
          showFirstLastPage: true,
          'items-per-page-text': 'Items por página',
          'items-per-page-all-text': 'Todos',
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :headers="headers"
        :items="tasks"
        :items-per-page-options="[5, 10, 15]"
        :loading="loading"

        class="mx-auto"
        style="height: auto; max-height: 500px; overflow-y: auto"

    >


      <template v-slot:item="{ item }">


        <tr>
          <td class="text-start">{{ item.name }}</td>
          <td class="text-start">{{ item.description }}</td>
          <td class="text-start">{{ formatDate(item.date_time_start) }}</td>
          <td class="text-start">{{ formatDate(item.date_time_end) }}</td>
          <td class="text-start">{{ findUser(item.id_user_assigned) }}</td>
          <td class="text-start">{{ findProject(item.fk_project) }}</td>
          <td class="text-start">
            <v-chip :color="item.finished ? 'green' : 'red'" outlined small>{{
                item.finished ? "Finished" : "Unfinished"
              }}
            </v-chip>


          <td class="text-start">
            <v-chip :color="item.active ? 'green' : 'red'" outlined small>{{
                item.active ? "Active" : "Unactive"
              }}
            </v-chip>
          </td>
          <td class="text-center">

            <TaskForm
                :visible="dialogFormTask"
                :loading="loading"
                :fetch="getAllTasks"
                :task="item"
            ></TaskForm>
            <v-btn
                color="red"
                class="m-1"
                :loading="loading"
                @click="deleteItemTasks(item.id_task)"
            >
              <v-icon class="m-1" color="white"
              >mdi-delete
              </v-icon
              >
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>


  </v-card>
</template>

<script>
import TaskService from "@/services/TaskService";
import swalService from "@/services/SwalService";
import moment from "moment";
import TaskForm from "@/components/admin/tasks/TaskForm.vue";
import ProjectsService from "@/services/ProjectsService";
import UsersServices from "@/services/UsersServices";


export default {
  components: {TaskForm},
  data() {
    return {
      loading: false,
      searchTasks: "",
      idTasks: null,


      headers: [
        {
          text: "Task Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Description",
          align: "start",
          sortable: false,
          value: "description",
        },
        {
          text: "Date Time Start",
          align: "start",
          sortable: false,
          value: "date_time_start",
        },
        {
          text: "Date Time End",
          align: "start",
          sortable: false,
          value: "date_time_end",
        },
        {
          text: "User Assigned",
          align: "start",
          sortable: false,
          value: "id_user_assigned"
        },
        {
          text: "Project",
          align: "start",
          sortable: false,
          value: "fk_project",
        },
        {
          text: "Finished",
          align: "start",
          sortable: false,
          value: "finished",
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
      tasks: [],
      projects: [],
      users: [],
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
      itemsPerPage: 10,
      dialogFormTask: false,
    };
  },

  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY HH:mm");
    },
    findUser(idUser) {
      if (this.users.length > 0) {
        const user = this.users.find(
            (user) => user.id_user === idUser
        );
        return user ? user.full_name : "Unknow";
      }
    },
    findProject(idProject) {
      if (this.projects.length > 0) {
        const project = this.projects.find(
            (project) => project.id_project === idProject
        );
        return project ? project.name_project : "Unknow";
      }
    },

    async deleteItemTasks(idTasks) {
      const result = await swalService.confirmationWarning(
          "¿Estás seguro de eliminar este evento?"
      );
      if (result) {
        this.loading = true;
        await TaskService.deleteTask(idTasks);
        await this.getAllTasks();
        this.loading = false;
      }
    },
    async getAllTasks() {

      this.tasks = await TaskService.getTasks();

    },
    async getProjects() {

      this.projects = await ProjectsService.getProjects();

    },
    async getUsers() {

      this.users = await UsersServices.getUsers();

    },
  },
  async mounted() {
    this.loading = true;
    await this.getAllTasks();
    await this.getProjects();
    await this.getUsers();
    this.loading = false;
  },
  watch: {
    searchTasks: function (val) {
      if (val) {
        this.tasks = this.tasks.filter((item) => {
          return item.name
                  .toLowerCase()
                  .includes(val.toLowerCase()) ||
              item.description.toLowerCase().includes(val.toLowerCase());
        });
      } else {
        this.getAllTasks();
      }
    },
  },
};
</script>
