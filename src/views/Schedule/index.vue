<template>
    <v-container fluid>
        <v-row class="fill-height">
            <v-col>
            <v-sheet height="64">
                <v-toolbar
                flat
                >
                <v-btn
                    outlined
                    class="mr-4"
                    color="grey darken-2"
                    @click="setToday"
                >
                    Today
                </v-btn>
                <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="prev"
                >
                    <v-icon small>
                    mdi-chevron-left
                    </v-icon>
                </v-btn>
                <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="next"
                >
                    <v-icon small>
                    mdi-chevron-right
                    </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-dialog
                  v-model="dialog"
                  max-width="700px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      outlined
                      class="mr-4"
                      color="grey darken-2"
                      
                      v-bind="attrs"
                      v-on="on"  
                    >
                      {{ 'Nouveau' }}
                    </v-btn>
                  </template>
                    <v-card>
                      <v-card-title style="background-color: #00366f;color: white;">
                        <span class="text-h5">{{ 'Nouveau' }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="3"
                            >
                              <h4 style="color: #00366f">{{ 'événement' }}</h4>
                            </v-col>

                            <v-divider
                              class="mx-4"
                              inset
                              vertical
                            ></v-divider>

                            <v-col>
                              <v-menu
                                v-model="date_of_mission"
                                :close-on-content-click="false"
                                max-width="290"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    :value="computedDateFormattedDate"
                                    prepend-icon="mdi-calendar"
                                    clearable
                                    :label="'Date mission'"
                                    readonly
                                    single-line
                                    dense
                                    hint="Choisissez une date"
                                    persistent-hint
                                    v-bind="attrs"
                                    v-on="on"
                                    @click:clear="editedItem.date = null"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedItem.date"
                                  @change="date_of_mission = false"
                                ></v-date-picker>
                              </v-menu>
                              <br>
                              <v-select
                                :items="teams"
                                :label="'Equipes'"
                                item-value="_id"
                                item-text="name"
                                v-model="editedItem.teamId"
                                return-object
                                single-line
                                prepend-icon="mdi-microsoft-teams"
                                hint="Choisissez une équipe"
                                persistent-hint
                                dense
                              >
                              </v-select>
                              <br>
                              <v-select
                                :items="drivers"
                                :label="'Chauffeurs'"
                                item-value="_id"
                                item-text="raison"
                                v-model="editedItem.driverId"
                                return-object
                                single-line
                                prepend-icon="mdi-card-account-details"
                                hint="Choisissez un chauffeur"
                                persistent-hint
                                dense
                              >
                                <template slot="selection" slot-scope="data">
                                    {{ data.item.lastName }} {{ data.item.firstName }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    {{ data.item.lastName }} {{ data.item.firstName }}
                                </template>
                              </v-select>
                              <br>
                            
                              <v-select
                                v-model="editedItem.patientId"
                                :items="patients"
                                :menu-props="{ maxHeight: '400' }"
                                multiple
                                hint="Choisissez des Patients"
                                persistent-hint
                                prepend-icon="mdi-clipboard-account"
                                label="Patients"
                                item-value="_id"
                                :item-text="item =>`${item.lastName} ${item.firstName}`"
                                single-line
                              >
                              </v-select>
                              <br>

                              <v-radio-group 
                                
                                v-model="editedItem.periodId"
                                row 
                                mandatory
                              >
                                <v-radio
                                  v-for="n in period"
                                  :key="n.id"
                                  :label="n.label"
                                  :value="n.id"
                                  color="#F50057"
                                  
                                ></v-radio>
                              </v-radio-group>
                              
 
                            </v-col>
                            
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions style="background-color: #00366f;color: white;">
                        <v-spacer></v-spacer>
                        <v-btn
                          color="error"
                          @click="close"
                        >
                          {{ 'Annuler' }}
                        </v-btn>
                        <v-btn
                          color="success"
                          @click="save"
                        >
                          {{ 'Sauvegarder' }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-menu
                    bottom
                    right
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        outlined
                        color="grey darken-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right>
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
                    <v-list-item @click="type = '4day'">
                        <v-list-item-title>4 days</v-list-item-title>
                    </v-list-item>
                    </v-list>
                </v-menu>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
                <v-calendar
                locale="fr"
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="events"
                :event-color="getEventColor"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="updateRange"
                >
                  <template v-slot:event="{ event }">
                    {{ event.period + ' / ' }}{{ event.team }}
                  </template>
                </v-calendar>
                <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
                >
                <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                >
                    <v-toolbar
                    :color="selectedEvent.color"
                    dark
                    >
                    
                    <v-toolbar-title v-html="selectedEvent.period + ' / ' + selectedEvent.team"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon color="next" @click="updateEvent(selectedEvent)">
                        <v-icon size="20">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="red" @click="deleteEvent(selectedEvent._id)" small>
                        <v-icon size="20">mdi-delete</v-icon>
                    </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <v-row>
                        <v-col>
                          <h3 style="color:#00366f">Chauffeur</h3>
                          <div v-if=" selectedEvent.driverId != null">
                            {{ selectedEvent.driverId.lastName + ' ' + selectedEvent.driverId.firstName }} 
                          </div>
                        </v-col>
                        <v-col>
                          <h3 style="color:#00366f">Patient</h3>
                          <div v-if=" selectedEvent.patientId != null">
                            <div v-for="i in selectedEvent.patientId" :key="i._id">
                              {{ '- ' + i.lastName + ' ' + i.firstName }} 
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                    <v-btn
                        text
                        color="error"
                        @click="selectedOpen = false"
                    >
                        Cancel
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-menu>
            </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  import { ipcRenderer } from "electron"
  import moment from 'moment'
  export default {
    data: () => ({
      date_of_mission: false,
      dialog: false,
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'green'],
      names: ['Equipe-1', 'Equipe-2'],
      patients: [],
      drivers: [],
      teams: [
        {name: 'équipe-1', id: 1},
        {name: 'équipe-2', id: 2}
      ],
      radioGroup: 1,
      period: [
        {label: '03:00 - 07:00', id:1},
        {label: '07:00 - 11:00', id:2},
        {label: '12:00 - 16:00', id:3}
      ],
      editedItem: {
        date: '',
        teamId: '',
        patientId: '',
        driverId: '',
        periodId: ''
      },
      categories: ['équipe-1', 'équipe-2'],
    }),
    computed: {
      computedDateFormattedDate () {
        return this.editedItem.date ? moment(this.editedItem.date).locale('fr').format('dddd, MMMM Do YYYY') : ''
      },
    },
    mounted () {
      this.$refs.calendar.checkChange()
    },
    created () {
      this.initialize()
    },
    methods: {
      updateEvent (item) {
        console.log('item', item)
        
        this.editedIndex = this.events.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteEvent (id) {
        console.log('id', id)
      },
      save () {
        let first, second, color, label
        switch(this.editedItem.periodId) {
          case 1:
            first = new Date(`${this.editedItem.date}T04:00:00`)
            second = new Date(`${this.editedItem.date}T08:00:00`)
            break;
          case 2:
            first = new Date(`${this.editedItem.date}T08:00:00`)
            second = new Date(`${this.editedItem.date}T12:00:00`)
            break;
          case 3:
            first = new Date(`${this.editedItem.date}T13:00:00`)
            second = new Date(`${this.editedItem.date}T17:00:00`)
        }

        switch(this.editedItem.teamId.id) {
          case 1:
            color = '#008B8B'
            break;
          case 2:
            color = '#DC143C'
            break;
        }

        switch(this.editedItem.periodId) {
          case 1:
            label = '03:00 - 07:00'
            break;
          case 2:
            label = '07:00 - 11:00'
            break;
          case 3:
            label = '12:00 - 16:00'
        }
        
        
        let item = {
            patientId: this.editedItem.patientId,
            driverId: this.editedItem.driverId._id,
            period: label,
            team: this.editedItem.teamId.name,
            start: first.toISOString().substr(0, 19),
            end: second.toISOString().substr(0, 19),
            color: color,
            timed: true,
          }
        // console.log('events', item)
        ipcRenderer.send('schedule:add', item)
        this.close()
      },
      close () {
        this.dialog = false
      },
      newSchedule () {
        
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
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
      updateRange ({ start, end }) {
        
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      loadDrivers () {
        ipcRenderer.send('drivers:load'),
        ipcRenderer.on('drivers:get', (e, drivers) => {
          this.drivers = JSON.parse(drivers)
        })
      },
      loadPatients () {
        ipcRenderer.send('patients:load'),
        ipcRenderer.on('patients:get', (e, patients) => {
          this.patients = JSON.parse(patients)
        })
      },
      loadSchedule () {
        ipcRenderer.send('schedule:load'),
        ipcRenderer.on('schedule:get', (e, schedule) => {
          this.events = JSON.parse(schedule)
        })
      },
      initialize () {
        this.loadDrivers()
        this.loadPatients()
        this.loadSchedule()
      },
    },
  }
</script>

<style scoped>
  ::v-deep .mdi-clipboard-account::before {
    color: #F50057 !important;
  }
  ::v-deep .mdi-card-account-details::before {
    color: #F50057 !important;
  }
  ::v-deep .mdi-microsoft-teams::before {
    color: #F50057 !important;
  }
  ::v-deep .mdi-calendar::before {
    color: #F50057 !important;
  }
 
</style>