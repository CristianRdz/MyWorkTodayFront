<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
            flat
        >
          <v-btn
              class="me-4"
              color="secondary"

              variant="outlined"
              @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
              color="secondary"
              size="small"
              class="mr-2"
              variant="text"
              fab
              @click="prev"
          >
            <v-icon size="small">
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
              color="secondary"
              size="small"
              class="mr-2"
              variant="text"
              fab
              @click="next"
          >
            <v-icon size="small">
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="calendar">
            {{ calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu location="bottom end">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="secondary"
                  variant="outlined"
                  v-bind="attrs"
                  v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon end>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
            locale="eng-us"
            ref="calendar"
            v-model="focus"
            :events="tasks"
            :type="type"
            color="primary"
            @click:date="viewDay"
            @click:event="showEvent"
            @click:more="viewDay"
        ></v-calendar>
        <v-dialog
            max-width="500px"
            v-model="selectedOpen"
            :activator="selectedElement"
            :close-on-content-click="false"
        >
          <v-card
              class="w-full md:min-w-350px overflow-auto max-w-350px"
              flat
              v-if="selectedEvent.details"
          >
            <v-toolbar
                :color="selectedEvent.color"
                dark
            >
              <v-toolbar-title v-if="selectedEvent.name">
                {{ selectedEvent.name }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeModal">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text class="mt-4">
              <div>
                <v-icon left>mdi-text</v-icon>
                <span>Description: </span>
                <span>{{ selectedEvent.details.description }}</span>
              </div>
              <div>
                <v-icon left>mdi-check</v-icon>
                <span>Finished: </span>
                <span>{{ selectedEvent.details.finished ? 'Yes' : 'No' }}</span>
              </div>

              <div>
                <v-icon left>mdi-calendar</v-icon>
                <span>Start Date and Time: </span>
                <span>{{ formatDateTime(selectedEvent.start) }}</span>
              </div>
              <div>
                <v-icon left>mdi-calendar</v-icon>
                <span>End Date and Time: </span>
                <span>{{ formatDateTime(selectedEvent.end) }}</span>
              </div>


            </v-card-text>
            <v-card-actions>
              <v-btn
                  color="red"
                  dark
                  variant="text"
                  @click="closeModal"
              >
                Close
              </v-btn>
              <v-btn
                  color="success"
                  variant="text"
                  @click="setFinalizado(selectedEvent.details)"
              >
                Mark as Finished
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const calendar = ref()

const typeToLabel = {
  month: 'Month',
  week: 'Week',
  day: 'Day',

}

const focus = ref('')
const type = ref('month')
const selectedElement = ref(null)
const events = ref([])

onMounted(() => {
  calendar.value.checkChange()
})

function viewDay({date}) {
  focus.value = date
  type.value = 'day'
}

function setToday() {
  focus.value = ''
}

function prev() {
  calendar.value.prev()
}

function next() {
  calendar.value.next()
}


</script>

<script>
import {getEventosByPersonalIdUsuario, setFinalizarEvento} from "@/services/EventosServices";
import TaskService from "@/services/TaskService";
import moment from "moment/moment";

export default {
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Mes',
      week: 'Semana',
      day: 'Dia',

    },
    personal: {},
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    tasks: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
  }),
  async mounted() {
    this.$refs.calendar.checkChange()
    await this.fetchTasks()
  },
  methods: {
    showEvent({nativeEvent, event}) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    formatDateTime(dateTimeString) {
      //mexico city time
      return moment(dateTimeString).format("YYYY-MM-DD HH:mm");
    },
    viewDay({date}) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
   /* //"name": "aute in enim elit velit",
    "description": "esse enim voluptate magna aliqua",
    "date_time_start": "1974-03-08T11:55:50.413Z",
    "date_time_end": "1974-04-23T13:45:53.940Z",
    "active": true,
    "finished": false,
    "id_user_assigned": "v2345678-90bc-1def-g234-567890bcdefg",
    "fk_project": "2f863b3c-4e6f-5g33-9504-3g7fcedeed0b*/
    convertToTasks(json) {
      return json.map(evento => ({
        name: evento.name,
        start: new Date(evento.date_time_start),
        end: new Date(evento.date_time_end),
        color: 'blue',
        timed: true,
        details: evento,
      }));
    },
    closeModal() {
      this.selectedOpen = false
    },


    async setFinalizado(evento) {
      try {

        await setFinalizarEvento(evento.idEvento)
        this.tasks = []
        await this.fetchTasks()
        this.closeModal()
      } catch (e) {
        console.log(e)
      }
    },

    async fetchTasks() {
      try {
        let tasks = await TaskService.getMyTask()
        this.tasks = this.convertToTasks(tasks)
      } catch (e) {
        console.log(e)
      }
    },
  },

}
</script>