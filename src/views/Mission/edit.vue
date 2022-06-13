<template>
  <v-container fluid>
    <div>
      <!-- <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        :filename="$t('missions')"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <v-container fluid style="padding-top: 30px;">
            <v-container fluid>
              <v-row>
                <v-col>
                  <v-card
                    class="mx-auto"
                    max-width="700"
                    outlined
                  >
                    <v-card-title style="background-color: #ffffff;color: black">
                      <v-avatar size="60">
                        <v-img 
                            :src="companyInfo.logo"
                            contain
                            width="100%"
                        />
                      </v-avatar>
                      <p class="ml-3" style="text-indent: 10px;">
                        {{ $t(companyInfo.companyName) }}
                      </p>
                    </v-card-title>
                  </v-card>
                </v-col>
                
                <v-col>
                  <h1 style="border: 1px solid; padding: 12px;text-align: center; background-color: #f2f2f2;">{{ $t('SaleOrder') }}</h1>
                </v-col>
              </v-row>
            </v-container>

            <v-container fluid>
              <div style="width: 100%;" >
                <v-row style="padding: 12px;">
                  <v-col cols="6">
                    <v-row style="padding: 8px">
                      <p> 
                        {{ $t('Address') }}:
                      </p>
                      <p style="text-indent: 10px;">
                        {{ companyInfo.street }}, {{ companyInfo.state }}, {{ companyInfo.city }} , {{ companyInfo.country }}
                      </p>
                    </v-row>

                    <v-row style="padding: 8px">
                      <p>
                        {{ $t('NIS') }}:
                      </p>
                      <p style="text-indent: 10px;">
                        {{ companyInfo.statisticalIdentifierNumber }}
                      </p>
                    </v-row>

                    <v-row style="padding: 8px">
                      <p> 
                        {{ $t('NIF') }}:
                      </p>
                      <p style="text-indent: 10px;">
                        {{ companyInfo.taxIdentifierNumber }}
                      </p>
                    </v-row>

                    <v-row style="padding: 8px">
                      <p> 
                        {{ $t('RC') }}:
                      </p>
                      <p style="text-indent: 10px;">
                        {{ companyInfo.commercialRegisterNumber }}
                      </p>
                    </v-row>

                    <br>
                    <hr>
                    <br>

                    <v-row style="padding: 8px">
                      <p>
                        {{ $t('SaleDate') }}
                      </p>
                      <p style="text-indent: 10px;">
                        {{ formatDate(SaleInfo.date) }}
                      </p>
                    </v-row>
                  </v-col>

                  <v-spacer></v-spacer>

                  <v-col cols="6" style="border: 1px solid;">
                    <h1 style="text-align: center;">{{ $t('Customer') }}</h1>
                    <br>

                    <v-row style="padding: 8px">
                      <p>
                        {{ $t('Name') }}:
                      </p>
                      <p style="text-indent: 10px;">
                        {{ CustomerInfo.raison }}
                      </p>
                    </v-row>

                    <v-row style="padding: 8px">
                      <p>
                        {{ $t('Phone') }}:
                      </p>
                      <p style="text-indent: 10px;">
                        {{ CustomerInfo.phone }}
                      </p>
                    </v-row>

                    <v-row style="padding: 8px">
                      <p> 
                        {{ $t('Address') }}:
                      </p>
                      <p style="text-indent: 10px;">
                        {{ CustomerInfo.street }}, {{ CustomerInfo.state }}, {{ CustomerInfo.city }} , {{ CustomerInfo.country }}
                      </p>
                    </v-row>

                    <v-row style="padding: 8px">
                      <p> 
                        {{ $t('NIS') }}:
                      </p>
                      <p>
                        {{ CustomerInfo.statisticalIdentifierNumber }}
                      </p>
                    </v-row>

                    <v-row style="padding: 8px">
                      <p> 
                        {{ $t('NIF') }}:
                      </p>
                      <p style="text-indent: 10px;">
                        {{ CustomerInfo.taxIdentifierNumber }}
                      </p>
                    </v-row>

                    <v-row style="padding: 8px">
                      <p> 
                        {{ $t('RC') }}:
                      </p>
                      <p style="text-indent: 10px;">
                        {{ CustomerInfo.commercialRegisterNumber }}
                      </p>
                    </v-row>

                  </v-col>
                </v-row>
              </div>
            </v-container>

            <br>

            <v-container fluid>
              <v-data-table
                :headers="headers"
                :items="missions"
                hide-default-footer
                hide-default-header
                sort-by="code"
                class="elevation-4"
              >
                <template v-slot:header="{ props: { headers } }">
                  <thead>
                    <tr>
                      <th v-for="header in headers" :key="header.text" class="pdf-table">
                        <div :key="header.text" v-if="header.text == 'Actions'">{{  }}</div>
                        <div :key="header.text" v-else>
                          <span class="pdf-style">
                            {{ $t(header.text) }}
                          </span>
                        </div>   
                      </th>
                    </tr>
                  </thead>
                </template>
                
                <template v-slot:[`item.date`]="{ item }">
                  {{ formatDate(item.date) }}
                </template>

                <template v-slot:[`item.subTotal`]="{ item }">
                  {{ formatNumber(item.subTotal) }}
                </template>

                <template v-slot:[`item.price`]="{ item }">
                  {{ formatNumber(item.price) }}
                </template>

              </v-data-table>
            </v-container>
            
            <v-container fluid>
              <div style="width: 100%;" >
                <v-row style="padding: 12px;">
                  <v-col cols="6">
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="6" style="border: 1px solid;">
                    <v-row>
                      <v-col>
                        <p>
                          {{ $t('Vehicles') }}:
                        </p>
                      </v-col>
                      <v-col>
                        <p>
                          {{ formatNumber(SaleInfo.totalVehicles) }}
                        </p>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <p>
                          {{ $t('UntaxedAmount') }}:
                        </p>
                      </v-col>
                      <v-col>
                        <p>
                          {{ formatNumber(SaleInfo.totalUntaxedAmount) }}
                        </p>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <p> 
                          {{ $t('Total') }}:
                        </p>
                      </v-col>
                      <v-col>
                        <p>
                          {{ formatNumber(SaleInfo.totalPrice) }}
                        </p>
                      </v-col>
                    </v-row>
                        
                  </v-col>
                </v-row>
              </div>
            </v-container>
            
            <v-container>
              <v-row>
                <v-col >
                  <h4>Date</h4>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                  <h4>Signature</h4>
                </v-col>
              </v-row>
            </v-container>

          </v-container>    
        </section>
      </vue-html2pdf> -->
    </div>
    
      <v-card
        elevation="4"
      >
        <v-card-actions>
          <v-btn
            color="error"
            @click="getBack"
          >
            {{ 'Annuler' }}
          </v-btn>
          <v-btn
            v-show="!missionInfo.confirmed"
            color="success"
            @click="confirm"
          >
            {{ 'Sauvegarder' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    

    <v-container>
      <v-row style="border: 1px solid;" class="mt-2">
        <v-col>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4">
              <p class="font-weight-bold">{{ 'Chauffeur' }}</p>
            </v-col>

            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>

            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-select
                :items="drivers"
                :label="'Chauffeurs'"
                item-value="_id"
                item-text="raison"
                v-model="missionInfo.driverId"
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
              
              <!-- <p v-else>
                {{ CustomerInfo.raison }}
              </p> -->
  
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <p class="font-weight-bold">{{ 'Automobile' }}</p>
            </v-col>

            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>

            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-select
                :items="vehicles"
                :label="'Voitures'"
                item-value="_id"
                item-text="model"
                v-model="missionInfo.vehiculeId"
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
        </v-col>

        <v-spacer></v-spacer>

        <v-col
          cols="12"
          sm="6"
          md="1">
          <p class="font-weight-bold">{{ 'Date mission' }}</p>
        </v-col>

        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>

        <v-col
          cols="12"
          sm="6"
          md="3">
          <!-- <v-menu
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
                outlined
                dense
                v-bind="attrs"
                v-on="on"
                @click:clear="missionInfo.date = null"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="missionInfo.date"
              @change="date_of_mission = false"
            ></v-date-picker>
          </v-menu> -->
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
                outlined
                dense
                v-bind="attrs"
                v-on="on"
                @click:clear="missionInfo.date = null"
                @click="missionInfo.date = null"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="missionInfo.date"
              @change="date_of_mission = false"
            ></v-date-picker>
          </v-menu>
          <!-- <p>
            {{ formatDate(missionInfo.date) }}
          </p> -->
        </v-col>
        
      </v-row>
    </v-container>

    <v-container class="pl-0">
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="rides"
            :search="search"
            hide-default-footer
            sort-by=""
            hide-default-header
            :footer-props="{
              'items-per-page-text': 'Lignes par page :',             
            }"
          >
            <template v-slot:[`footer.page-text`]="items"> 
                {{ items.pageStart }} - {{ items.pageStop }} {{ 'de' }} {{ items.itemsLength }} 
            </template>

            <template v-slot:[`item.date`]="{ item }">
              {{ formatDate(item.date) }}
            </template>

            <template v-slot:[`item.stationsItems`]="{ item }">
              <div v-for="(item, index) in item.stationId" :key="item._id">
                {{ index + 1 }}- {{ item.name }}
              </div>
            </template>

            <template v-slot:[`item.patientsItems`]="{ item }">
              <div v-for="item in item.patientId" :key="item._id">
                - {{ item.lastName }} {{ item.firstName }}
              </div>
            </template>

            <!-- <template v-slot:[`item.subTotalHour`]="{ item }">
              {{ formatHeure(item.subTotalHour) }}
            </template> -->

            <template v-slot:header="{ props: { headers } }">
              <thead>
                <tr>
                  <th v-for="header in headers" :key="header.text" class="sale-table">
                    <div :key="header.text" v-if="missionInfo.confirmed == true">
                      <div :key="header.text" v-if="header.text == 'effacer'">{{ }}</div>
                      <div :key="header.text" v-else>
                        <span>
                          {{ header.text }}
                        </span>
                      </div>
                    </div>

                    <div :key="header.text" v-else>
                      <div :key="header.text">
                        <span class="sale-table">
                          {{ header.text }}
                        </span>
                      </div>
                    </div> 
                  </th>
                </tr>
              </thead>
            </template>

            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>{{ 'Trajets' }}</v-toolbar-title>

                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>

                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    :label="'Search'"
                    single-line
                    hide-details
                    class="shrink mx-4"
                ></v-text-field>

                <!-- <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>

                <v-btn
                  color="next"
                  dark
                  icon
                  class="mb-2"
                  @click="generateReport"
                >
                  <v-icon large>
                    mdi-printer
                  </v-icon>
                </v-btn> -->

                <v-spacer></v-spacer>

                <v-dialog
                  v-model="dialog"
                  max-width="700px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="success"
                      dark
                      icon
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      v-show="!missionInfo.confirmed"
                      
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
                          <v-col>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="3"
                              >
                                <h4 style="color: #00366f">{{ 'Informations de trajet' }}</h4>
                              </v-col>

                              <v-divider
                                  class="mx-4"
                                  inset
                                  vertical
                              ></v-divider>

                              
                              <v-col>
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
                                
                              >
                                
                              </v-select>

                              <v-select
                                v-model="editedItem.stationId"
                                :items="stations"
                                :menu-props="{ maxHeight: '400' }"
                                
                                multiple
                                hint="Choisissez des Stations"
                                persistent-hint
                                prepend-icon="mdi-routes"

                                label="Stations"
                                item-value="_id"
                                :item-text="'name'"
                                
                              >
                                
                              </v-select>
                                
                             
                                <v-menu
                                  ref="menu"
                                  v-model="menu2"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  :return-value.sync="editedItem.departureTime"
                                  transition="scale-transition"
                                  offset-y
                                  max-width="290px"
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="editedItem.departureTime"
                                      label="heure départ"
                                      prepend-icon="mdi-clock-time-four-outline"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-time-picker
                                    v-if="menu2"
                                    v-model="editedItem.departureTime"
                                    full-width
                                    @click:minute="$refs.menu.save(editedItem.departureTime)"
                                  ></v-time-picker>
                                </v-menu>

                                <v-menu
                                  ref="menu3"
                                  v-model="menu4"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  :return-value.sync="editedItem.arrivingTime"
                                  transition="scale-transition"
                                  offset-y
                                  max-width="290px"
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="editedItem.arrivingTime"
                                      label="heure d'arrivée"
                                      prepend-icon="mdi-clock-time-four-outline"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-time-picker
                                    v-if="menu4"
                                    v-model="editedItem.arrivingTime"
                                    full-width
                                    @click:minute="$refs.menu3.save(editedItem.arrivingTime)"
                                  ></v-time-picker>
                                </v-menu>
                                
                                <v-text-field
                                  v-model="editedItem.departureCounter"
                                  :label="'compteur départ'"
                                  type="number"
                                  prepend-icon="mdi-counter"
                                  
                                ></v-text-field>
                              
                                <v-text-field
                                  v-model="editedItem.arrivalCounter"
                                  :label="'compteur d\'arrivée'"
                                  type="number"
                                  prepend-icon="mdi-counter"
                                ></v-text-field>
  
                              </v-col>
                            </v-row>
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
              <!-- <v-icon
                small
                class="mr-2"
                color="primary"
                
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon> -->

              <v-icon
                small
                color="red"
                v-show="!missionInfo.confirmed"
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>

            <template v-slot:[`item.subTotalHour`]="{ item }">
              <v-chip
                :color="getColor(item)"
                dark
              >
                  {{ formatHeure(item.subTotalHour) }}
              </v-chip>
            </template>

            <template v-slot:[`item.subTotalDistance`]="{ item }">
              <v-chip
                :color="getColor(item)"
                dark
              >
                  {{ formatNumber(item.subTotalDistance) }}
              </v-chip>
            </template>

            <template v-slot:[`item.departureCounter`]="{ item }">
                  {{ formatNumber(item.departureCounter) }}
            </template>

            <template v-slot:[`item.arrivalCounter`]="{ item }">
                  {{ formatNumber(item.arrivalCounter) }}
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
        </v-col>

        <v-card style="background-color: #00366f; border-radius: 5px;max-height: 250px" class="mt-3 pa-0">
          <v-container >
              
              <v-row>
                <v-col class="pb-0">
                  <v-text-field
                    :value="`${0}`"
                    :label="'Total Patients'"
                    outlined
                    readonly
                    dark
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="py-0 text-start">
                  <v-text-field
                    :value="formatNumber(missionInfo.totalDistances)"
                    :label="'Distance totale'"
                    outlined
                    readonly
                    dark
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="py-0">
                  <v-text-field
                    :value="`${formatHeure(missionInfo.totalHours)}`"
                    :label="'Totale des heures'"
                    outlined
                    readonly
                    dark
                  ></v-text-field>
                </v-col>
              </v-row>

          </v-container>
        </v-card>
      
      </v-row>
    </v-container>
    
  </v-container>
</template>

<script>
  import {ipcRenderer} from "electron";
  import moment from 'moment';
//   import VueHtml2pdf from 'vue-html2pdf';
  
  export default {
    // components: {
    //     VueHtml2pdf
    // },
    data: () => ({
      // time: null,
      menu2: false,
      menu4: false,
     
      id: '',
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Stations',
          align: 'start',
          value: 'stationsItems',
        },
        { text: 'patients', value: "patientsItems" },
        { text: 'heure départ', value: "departureTime" },
        { text: 'heure d\'arrivée', value: 'arrivingTime' },
        { text: 'nombre d\'heure', value: 'subTotalHour' },
        { text: 'compteur départ', value: 'departureCounter' },
        { text: 'compteur d\'arrivée', value: 'arrivalCounter' },
        { text: 'distance parcourue', value: 'subTotalDistance' },
        { text: 'effacer', value: 'actions', sortable: false },
      ],
      missions: [],
      patients: [],
      stations: [],   
      drivers: [],
      vehicles: [],
      missionInfo: [],
      rides: [],
      confirmButton: false,
      pdfHeaders: [],
      date_of_mission: '',
      editedIndex: -1,
      editedItem: {
        missionId: [],
        patientId: [],
        stationId: '',
        departureTime: '',
        arrivingTime: '',
        departureCounter: '',
        arrivalCounter: '',
        subTotalDistance: 0,
        subTotalHour: 0,
      },
      defaultItem: {
        missionId: '',
        patientId: '',
        stationId: '',
        departureTime: '',
        arrivingTime: '',
        departureCounter: '',
        arrivalCounter: '',
        subTotalDistance: 0,
        subTotalHour: 0,
      },
    }),

    computed: {
      computedDateFormattedDate () {
        console.log('this.missionInfo.date', this.missionInfo.date)
        console.log('Format', this.missionInfo.date ? moment(this.missionInfo.date).locale('fr').format('dddd, MMMM Do YYYY') : '')
        return this.missionInfo.date ? moment(this.missionInfo.date).locale('fr').format('dddd, MMMM Do YYYY') : ''
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
      this.getRouteId()
    },
    methods: {
      formatNumber(value) {
        return new Intl.NumberFormat('fr',{ style: 'unit', unit: 'kilometer',}).format(value)
      },
      getColor (valeur) {
        return 'green'
      },
      setPatients(e){
        this.editedItem.patientId = e
      },
      setStations(e){
        this.editedItem.stationId = e
      },
      getBack () {
        this.$router.push({ path: `/missions`  });
      },
      confirm () {
        var self = this;
        this.$swal({
        title: "voulez-vous confirmer cette mission ?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: '#FF5252',
        confirmButtonColor: '#4CAF50',
        }).then((result) => {
          if (result.isConfirmed) {

              self.missionInfo.confirmed = true
              ipcRenderer.send('missionInfo:edit', self.missionInfo)
              self.$swal({
              position: 'top-end',
              title: "Mission confirmée !",
              icon: "success",
              showConfirmButton: false,
              })
              self.$router.push({ path: `/missions`  });
           
          }
        })
      },
      // generateReport () {
      //     this.$refs.html2Pdf.generatePdf()
      // },
      getRouteId() {
          this.id = this.$route.params.id,
          this.initialize()
      },
      formatDate(value) {
        return moment(value).locale('fr').format("MMMM DD YYYY, h:mm:ss a")
      },

      formatHeure(value) {
        var hours=parseInt(value/60)+":"+ value%60;
        return hours
      },
      
      loadPatients() {
        ipcRenderer.send('patients:load'),
        ipcRenderer.on('patients:get', (e, patients) => {
          this.patients = JSON.parse(patients)
        })
      },

      loadVehicles() {
        ipcRenderer.send('vehicles:load'),
          ipcRenderer.on('vehicles:get', (e, vehicles) => {
          this.vehicles = JSON.parse(vehicles)
        })
      },

      loadDrivers () {
        ipcRenderer.send('drivers:load'),
        ipcRenderer.on('drivers:get', (e, drivers) => {
          this.drivers = JSON.parse(drivers)
        })
      },

      loadStations () {
        ipcRenderer.send('stations:load'),
        ipcRenderer.on('stations:get', (e, stations) => {
          this.stations = JSON.parse(stations)
        })
      },

      loadRides() {
        ipcRenderer.send('rides:load', this.id),
        ipcRenderer.on('rides:get', (e, rides) => {
          this.rides = JSON.parse(rides)
        })
      },

      loadMissionInfo() {
        ipcRenderer.send('missionInfo:load', this.id),
        ipcRenderer.on('missionInfo:get', (e, missionInfo) => {
          this.missionInfo = JSON.parse(missionInfo)
          console.log('this.missionInfo', this.missionInfo)
        })
      },
      
      initialize () {
        this.loadPatients()
        // this.loadMissions()
        this.loadVehicles()
        this.loadDrivers()
        this.loadStations()
        this.loadRides()
        this.loadMissionInfo()
      },

      editItem (item) {
        this.editedIndex = this.missions.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.missions.indexOf(item)
        this.editedItem = Object.assign({}, item)
        // this.editedIndex = item._id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.missionInfo.totalDistances = this.missionInfo.totalDistances - this.editedItem.subTotalDistance
        this.missionInfo.totalHours = this.missionInfo.totalHours - this.editedItem.subTotalHour
        ipcRenderer.send('missionInfo:edit', this.missionInfo)
        ipcRenderer.send('rides:delete', this.editedItem)
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
        this.editedItem.missionId = this.id
        this.editedItem.subTotalDistance = this.editedItem.arrivalCounter - this.editedItem.departureCounter 
      
          function getAct(data, s) {
            var startTime = data[10];
            var endTime = data[11];

            var s = startTime.split(':');
            var e = endTime.split(':');

            var end = parseInt(e[0])* 60+ parseInt(e[1]);
            var start = parseInt(s[0])*60 + parseInt(s[1]);

            var elapsedMs = Math.abs(end - start);
            
            return elapsedMs ;
          }
          var data=[];

          data[11] = this.editedItem.arrivingTime;
          data[10] = this.editedItem.departureTime;

          var minutes=getAct(data); 
          console.log('minutes', minutes)

          // var hours=parseInt(minutes/60)+":"+ minutes%60;
    
          this.editedItem.subTotalHour = minutes

          // this.missionInfo.totalPatients = this.missionInfo.totalPatients + 
          this.missionInfo.totalDistances = this.missionInfo.totalDistances + this.editedItem.subTotalDistance
          this.missionInfo.totalHours = this.missionInfo.totalHours + minutes

          ipcRenderer.send('missionInfo:edit', this.missionInfo)

        if (this.editedIndex > -1) {
          ipcRenderer.send('rides:edit', this.editedItem)
        } else {
          ipcRenderer.send('rides:add', this.editedItem)

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

  ::v-deep .mdi-routes::before {
    color: #F50057 !important;
  }

  ::v-deep .mdi-clipboard-account::before {
    color: #F50057 !important;
  }

  ::v-deep .mdi-clock-time-four-outline::before {
    color: #F50057 !important;
  }

  ::v-deep .mdi-counter::before {
    color: #F50057 !important;
  }

  ::v-deep .mdi-counter::before {
    color: #F50057 !important;
  }

  .pdf-table {
    background-color: #f2f2f2;
  }

  .pdf-style {
    color: black !important;
  }

  .sale-table {
    background-color: #00366f;
  }
  .sale-style {
    color: white !important;
  }
</style>
