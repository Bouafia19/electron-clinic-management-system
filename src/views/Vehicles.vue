<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="vehicles"
      sort-by="model"
      :search="search"
      class="elevation-4"
      :footer-props="{
          'items-per-page-text': 'Lignes par page :',           
      }"
    >
      <template v-slot:[`item.fullName`]="{ item }">
        {{ item.driverId.firstName }} {{ item.driverId.lastName }}
      </template>

      <!-- <template v-slot:[`item.address`]="{ item }">
        {{ item.street }} {{ item.city }}, {{ item.state }}, {{ item.country }}
      </template> -->

      <!-- <template v-slot:[`item.fullName`]="{ item }">
        {{ item.firstName }} {{ item.lastName }}
      </template> -->

      <template v-slot:[`footer.page-text`]="items"> 
        {{ items.pageStart }} - {{ items.pageStop }} {{ 'de' }} {{ items.itemsLength }} 
      </template>
      
      <!-- <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ header }">
        {{ header.text }}
      </template> -->

      <!-- <template v-slot:[`item.dateOfBirth`]="{ item }">
        {{ formatDate(item.dateOfBirth) }}
      </template> -->

      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>{{ 'Voitures' }}</v-toolbar-title>
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
            max-width="1350px"
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
                  <v-card-title class="justify-center" style="background-color: #ffffff">
                    <h2 class="text-uppercase" style="color: #00366f;">{{ 'Voiture' }}</h2>
                    <v-spacer></v-spacer>
                    <v-avatar 
                      size="150"
                      rounded="lg"
                    >
                      <v-hover v-slot="{ hover }">
                        <v-img 
                          :src="editedItem.photo"
                          contain
                          width="100%"
                          style="float: right; border: 1px solid;"
                          alt="Voiture Image"
                        >  
                          <v-file-input 
                            v-model="image" 
                            type="file" 
                            :label="'Photo'"
                            hide-input
                            placeholder="Photo"
                            v-if="hover"
                            @change="onFileChange"  
                          />     
                        </v-img> 
                      </v-hover>
                    </v-avatar> 
                  </v-card-title>

                  <v-divider
                    class="mx-4"
                    inset
                    >
                  </v-divider>

                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="1">
                        <h4 style="color: #00366f;">{{ 'Voiture' }}</h4>
                      </v-col>

                      <v-divider
                        class="mx-4"
                        inset
                        vertical>
                      </v-divider>

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        
                            <v-text-field
                              v-model="editedItem.model"
                              :label="'Modèle'"
                              outlined
                              dense
                            ></v-text-field>
                         
                            <v-text-field
                              v-model="editedItem.licensePlate"
                              :label="'Immatriculation'"
                              outlined
                              dense
                            ></v-text-field>
                        
                        <!-- <v-menu
                          v-model="date_of_birth"
                          :close-on-content-click="false"
                          max-width="290"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="computedDateFormattedDateOfBirth"
                              prepend-icon="mdi-calendar"
                              clearable
                              :label="'date de naissance'"
                              readonly
                              outlined
                              dense
                              v-bind="attrs"
                              v-on="on"
                              @click:clear="editedItem.dateOfBirth = null"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.dateOfBirth"
                            @change="date_of_birth = false"
                          ></v-date-picker>
                        </v-menu> -->

                        <v-text-field
                          v-model="editedItem.chassisNumber"
                          :label="'Numéro de châssis'"
                         
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col></v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="1"
                      >
                        <h4 style="color: #00366f;">{{ 'Chauffeur' }}</h4>
                      </v-col>

                      <v-divider
                        class="mx-4"
                        inset
                        vertical>
                      </v-divider>

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-row>
                          <v-col>
                            <v-select
                              :items="drivers"
                              :label="'Chauffeurs'"
                              item-value="_id"
                              item-text="lastName"
                              prepend-icon="mdi-badge-account-horizontal"
                              v-model="editedItem.driverId"
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
                          
                            <v-text-field
                              v-model="editedItem.odometer"
                              :label="'compteur kilométrique'"
                              type="number"
                              prepend-icon="mdi-counter"
                              outlined
                              dense
                            ></v-text-field>
                          
                            <v-menu
                              v-model="assignment_date"
                              :close-on-content-click="false"
                              max-width="290"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="computedDateFormattedAssignmentDate"
                                  prepend-icon="mdi-calendar"
                                  clearable
                                  :label="'date d\'affectation'"
                                  readonly
                                  outlined
                                  dense
                                  v-bind="attrs"
                                  v-on="on"
                                  @click:clear="editedItem.assignmentDate = null"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                  v-model="editedItem.assignmentDate"
                                  @change="assignment_date = false"
                              ></v-date-picker>
                            </v-menu>    
                          </v-col>
                        </v-row>
                      </v-col> 
                    </v-row>
                    
                    <!-- <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="1"
                      >  
                        <h4 style="color: #00366f;">{{ 'Addresse' }}</h4>
                      </v-col>

                      <v-divider
                        class="mx-4"
                        inset
                        vertical>
                      </v-divider>

                      <v-col 
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.street"
                          :label="'Rue'"
                          prepend-icon="mdi-map-marker"
                          outlined
                          dense
                        ></v-text-field>

                        <v-row>
                          <v-col class="py-0">
                            <v-text-field
                              v-model="editedItem.city"
                              :label="'Ville'"
                              outlined
                              dense
                            ></v-text-field>
                          </v-col>

                          <v-col class="py-0">
                            <v-text-field
                              v-model="editedItem.state"
                              :label="'wilaya'"
                              outlined
                              dense  
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col class="py-0">
                            <v-text-field
                              v-model="editedItem.country"
                              :label="'Pays'"
                              outlined
                              dense 
                            ></v-text-field>
                          </v-col>

                          <v-col class="py-0">
                            <v-text-field
                              v-model="editedItem.zip"
                              :label="'Code Postal'"
                              outlined
                              dense
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row> -->
                  </v-container>    
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
          @click="editItem(item)"
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

      <template v-slot:[`item.odometer`]="{ item }">
        {{ formatNumber(item.odometer) }}
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
          text: 'Modèle',
          align: 'start',
          value: 'model',
        },
        { text: 'Chauffeur', value: 'fullName' },
        { text: 'Immatriculation', value: 'licensePlate' },
        { text: "numéro de châssis", value: "chassisNumber" },
        { text: 'odomètre', value: 'odometer' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      vehicles: [],
      drivers: [],
      date_of_birth: '',
      assignment_date: '',
      editedIndex: -1,
      editedItem: {
        model: '',
        licensePlate: '',
        driverId: '',
        assignmentDate: '',
        chassisNumber: '',
        odometer: '',
        photo: '',
      },
      defaultItem: {
        model: '',
        licensePlate: '',
        driverId: '',
        assignmentDate: '',
        chassisNumber: '',
        odometer: '',
        photo: '',
      },
    }),

    computed: {
      computedDateFormattedAssignmentDate () {
        return this.editedItem.assignmentDate ? moment(this.editedItem.assignmentDate).format('dddd, MMMM Do YYYY') : ''
      },
    //   computedDateFormattedDateOfBirth () {
    //     return this.editedItem.dateOfBirth ? moment(this.editedItem.dateOfBirth).format('dddd, MMMM Do YYYY') : ''
    //   },
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
      formatNumber(value) {
        return new Intl.NumberFormat('fr',{ style: 'unit', unit: 'kilometer',}).format(value)
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

      initialize () {
        ipcRenderer.send('vehicles:load'),
        ipcRenderer.on('vehicles:get', (e, vehicles) => {
          this.vehicles = JSON.parse(vehicles)
        })
        // Load Drivers
        ipcRenderer.send('drivers:load'),
        ipcRenderer.on('drivers:get', (e, drivers) => {
          this.drivers = JSON.parse(drivers)
        })
      },

      editItem (item) {
        this.editedIndex = this.vehicles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item._id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        ipcRenderer.send('vehicles:delete', this.editedIndex)
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
          ipcRenderer.send('vehicles:edit', this.editedItem)
        } else {
          ipcRenderer.send('vehicles:add', this.editedItem)
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
  ::v-deep table > thead > tr:last-child > th .header__icon {
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
  ::v-deep .mdi-counter::before {
    color: #F50057 !important;
  }
  ::v-deep .mdi-badge-account-horizontal::before {
    color: #F50057 !important;
  }
  
</style>