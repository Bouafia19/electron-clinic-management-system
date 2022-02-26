<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="missions"
      sort-by="lastName"
      :search="search"
      class="elevation-4"
      :footer-props="{
          'items-per-page-text': 'Lignes par page :',           
      }"
    >
       <template v-slot:[`item.fullName`]="{ item }">
        {{ item.driverId.firstName }} {{ item.driverId.lastName }}
      </template>

      <template v-slot:[`item.address`]="{ item }">
        {{ item.street }} {{ item.city }}, {{ item.state }}, {{ item.country }}
      </template>

      <template v-slot:[`footer.page-text`]="items"> 
        {{ items.pageStart }} - {{ items.pageStop }} {{ 'de' }} {{ items.itemsLength }} 
      </template>
      
      <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ header }">
        {{ header.text }}
      </template>

      <template v-slot:[`item.dateOfBirth`]="{ item }">
        {{ formatDate(item.dateOfBirth) }}
      </template>

      <template v-slot:[`item.date`]="{ item }">
        {{ formatDate(item.date) }}
      </template>

      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>{{ 'Missions' }}</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="'Chercher'"
              single-line
              hide-details
              class="shrink mx-4"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="700px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="next"
                dark
                icon
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon large>
                  mdi-plus-circle
                </v-icon>
              </v-btn>
            </template>
           <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <h4 style="color: #00366f">{{ 'Informations de la mission' }}</h4>
                  </v-col>

                  <v-divider
                      class="mx-4"
                      inset
                      vertical
                  ></v-divider>
                  <v-col
                   
                  >
                    <v-text-field
                      v-model="editedItem.code"
                      :label="'Code'"
                      outlined
                      dense
                    ></v-text-field>

                    <v-select
                      :items="drivers"
                      :label="'Chauffeurs'"
                      item-value="_id"
                      item-text="raison"
                      v-model="editedItem.driverId"
                      return-object
                      single-line
                      outlined
                      dense
                    >
                      <template slot="selection" slot-scope="data">
                          {{ data.item.lastName }} {{ data.item.firstName }}
                      </template>
                      <template slot="item" slot-scope="data">
                          {{ data.item.lastName }} {{ data.item.firstName }}
                      </template>
                    </v-select>

                    <v-select
                      :items="vehicles"
                      :label="'Voitures'"
                      item-value="_id"
                      item-text="model"
                      v-model="editedItem.vehiculeId"
                      return-object
                      single-line
                      outlined
                      dense
                      
                      
                    >
                      <!-- <template slot="selection" slot-scope="data">
                          {{ data.item.lastName }} {{ data.item.firstName }}
                      </template>
                      <template slot="item" slot-scope="data">
                          {{ data.item.lastName }} {{ data.item.firstName }}
                      </template> -->
                    </v-select>



                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
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
          <v-dialog v-model="dialogDelete" max-width="700px">
            <v-card>
              <v-card-title class="text-h5 justify-center">{{ 'Êtes-vous sûr de bien vouloir supprimer cet élément ?' }}</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="red" @click="closeDelete">{{ 'Annuler' }}</v-btn>
                <v-btn dark color="success" @click="deleteItemConfirm">{{ 'D\'accord' }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          color="primary"
          @click="routerClick(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          color="red"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="next"
          dark
          @click="initialize"
        >
          <v-icon>
            mdi-reload
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import {ipcRenderer} from "electron";
  import moment from 'moment';

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      image: undefined,
      headers: [
        {
          text: 'Code',
          align: 'start',
          value: 'code',
        },
        { text: 'Nom et Prénom', value: 'fullName' },
        { text: 'Automobile', value: 'vehiculeId.model' },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      drivers: [],
      missions: [],
      vehicles: [],
      editedIndex: -1,
      editedItem: {
        code: '',
        vehiculeId: '',
        driverId: '',
      },
      defaultItem: {
        code: '',
        vehiculeId: '',
        driverId: '',
      },
    }),

    computed: {
      computedDateFormattedExperationDate () {
        return this.editedItem.experationDate ? moment(this.editedItem.experationDate).format('dddd, MMMM Do YYYY') : ''
      },
      computedDateFormattedDateOfBirth () {
        return this.editedItem.dateOfBirth ? moment(this.editedItem.dateOfBirth).format('dddd, MMMM Do YYYY') : ''
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Nouveau' : 'Modifier'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created() {
      this.initialize()
    },

    methods: {
      routerClick(item) {
        this.$router.push({ path: `/mission/${item._id}/edit`  });
      },
      formatDate(value) {
        return moment(value).locale('fr').format("MMMM DD YYYY")
      },
      createImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedItem.photo = e.target.result;
        };
        reader.readAsDataURL(file);
        },
        onFileChange(file) {
          if (!file) {
            return;
          }
          this.createImage(file);
      },

      loadDrivers () {
        ipcRenderer.send('drivers:load'),
        ipcRenderer.on('drivers:get', (e, drivers) => {
          this.drivers = JSON.parse(drivers)
        })
      },

      loadMissions() {
        ipcRenderer.send('missions:load', this.id),
        ipcRenderer.on('missions:get', (e, missions) => {
          this.missions = JSON.parse(missions)
        })
      },

       loadVehicles() {
        ipcRenderer.send('vehicles:load'),
          ipcRenderer.on('vehicles:get', (e, vehicles) => {
          this.vehicles = JSON.parse(vehicles)
        })
      },

      initialize () {
        this.loadMissions()
        this.loadDrivers()
        this.loadVehicles()
      },

      editItem (item) {
        this.editedIndex = this.missions.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item._id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        ipcRenderer.send('missions:delete', this.editedIndex)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        this.close()
        if (this.editedIndex > -1) {
          ipcRenderer.send('missions:edit', this.editedItem)
        } else {
          ipcRenderer.send('missions:add', this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style scoped>
  .v-card__title {
    background-color: #00366f;
    color: white;
  }
  .v-card__actions {
    background-color: #00366f;
  }
  .v-data-table {
    border: 1px solid black;
  }
  ::v-deep .v-data-table-header {
    background-color: #00366f; 
  } 
  ::v-deep table > thead > tr:last-child > th {
    color: white !important;
  }
  ::v-deep table > thead > tr:last-child > th .v-icon__svg {
    color: #ffffff !important;
  }
  ::v-deep .mdi-phone-classic::before {
    color: #F50057 !important;
  }
  ::v-deep .mdi-human-male::before {
    color: #F50057 !important;
  }
  ::v-deep .mdi-cellphone::before {
    color: #F50057 !important;
  }
  ::v-deep .mdi-map-marker::before {
    color: #F50057 !important;
  }
  ::v-deep .v-file-input .v-icon {
    color: #F50057 !important;
  }
  ::v-deep .mdi-calendar::before {
    color: #F50057 !important;
  }
  ::v-deep .mdi-card-account-details::before {
    color: #F50057 !important;
  }
  ::v-deep .mdi-blood-bag::before {
    color: #F50057 !important;
  }
</style>