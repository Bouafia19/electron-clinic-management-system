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
                v-model="CustomerInfo._id"
                return-object
                single-line
                outlined
                dense
                @change="getCustomerInfo($event)"
                
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
                v-model="CustomerInfo._id"
                return-object
                single-line
                outlined
                dense
                @change="getCustomerInfo($event)"
                
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
                @click:clear="editedItem.date = null"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="editedItem.date"
              @change="date_of_mission = false"
            ></v-date-picker>
          </v-menu>
          <!-- <p v-else>
            {{ 'formatDate(mission.date)' }}
          </p> -->
        </v-col>
        
      </v-row>
    </v-container>

    <v-container class="pl-0">
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="missions"
            :search="search"
            hide-default-footer
            sort-by=""
            
            :footer-props="{
              'items-per-page-text': 'Lignes par page :',             
            }"
          >
            <template v-slot:[`footer.page-text`]="items"> 
                {{ items.pageStart }} - {{ items.pageStop }} {{ 'de' }} {{ items.itemsLength }} 
            </template>

            <!-- <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ header }">
             
               <thead>
                <tr>
                  <th v-for="header in headers" :key="header.text" class="sale-table">
                    <div :key="header.text" v-if="SaleInfo.disabled == true">
                      <div :key="header.text" v-if="header.text == 'Actions'">{{ }}</div>
                      <div :key="header.text" v-else>
                        <span class="sale-style">
                          {{ $t(header.text) }}
                        </span>
                      </div>
                    </div>

                    <div :key="header.text" v-else>
                      <div :key="header.text">
                        <span class="sale-style">
                          {{ $t(header.text) }}
                        </span>
                      </div>
                    </div> 
                  </th>
                </tr>
              </thead>
             
            </template> -->
            <!-- <template v-slot:header="{ props: { headers } }">
              <thead>
                <tr>
                  <th v-for="header in headers" :key="header.text" class="sale-table">
                    <div :key="header.text" v-if="SaleInfo.disabled == true">
                      <div :key="header.text" v-if="header.text == 'Actions'">{{ }}</div>
                      <div :key="header.text" v-else>
                        <span class="sale-style">
                          {{ $t(header.text) }}
                        </span>
                      </div>
                    </div>

                    <div :key="header.text" v-else>
                      <div :key="header.text">
                        <span class="sale-style">
                          {{ $t(header.text) }}
                        </span>
                      </div>
                    </div> 
                  </th>
                </tr>
              </thead>
            </template> -->
            

            <template v-slot:[`item.date`]="{ item }">
              {{ formatDate(item.date) }}
            </template>

            <template v-slot:[`item.subTotal`]="{ item }">
              {{ formatNumber(item.subTotal) }}
            </template>

            <template v-slot:[`item.price`]="{ item }">
              {{ formatNumber(item.price) }}
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

                <v-divider
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
                </v-btn>

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
                                <h4>{{ 'Mission Info' }}</h4>
                              </v-col>

                              <v-divider
                                  class="mx-4"
                                  inset
                                  vertical
                              ></v-divider>

                              
                              <v-col
                                
                              >
                                <v-select
                                  v-model="e6"
                                  :items="patients"
                                  :menu-props="{ maxHeight: '400' }"
                                  label="Patients"
                                  item-value="_id"
                                  item-text="fullName"
                                  multiple
                                  hint="Choisissez des stations"
                                  persistent-hint
                                  @change="log($event)"
                                >
                                   <template slot="selection" slot-scope="data">
                                      {{ data.item.lastName }} {{ data.item.firstName }}
                                  </template>
                                  <template slot="item" slot-scope="data">
                                      {{ data.item.lastName }} {{ data.item.firstName }}
                                  </template>
                                </v-select>
                              
                                <!-- <v-select
                                  v-model="e7"
                                  :items="patients"
                                  label="Select"
                                  item-value="_Id"
                                  item-text="lastName"
                                  multiple
                                  chips
                                  hint="Choisissez des patients"
                                  persistent-hint
                                >
                                  <template slot="selection" slot-scope="data">
                                      {{ data.item.lastName }} {{ data.item.firstName }}
                                  </template>
                                  <template slot="item" slot-scope="data">
                                      {{ data.item.lastName }} {{ data.item.firstName }}
                                  </template>
                                </v-select> -->
                              </v-col>

                              <!-- <v-col
                                
                              >
                                <v-select
                                  :items="products"
                                  :label="$t('Products')"
                                  item-value="productId"
                                  item-text="productId.name"
                                  v-model="editedItem.productId"
                                  @change="getBuyingPrice($event)"
                                  outlined
                                  dense
                                ></v-select>
                              
                                <v-text-field
                                  v-model="editedItem.amount"
                                  :label="$t('Quantity')"
                                  type="number"
                                  outlined
                                  dense
                                ></v-text-field>
                              
                                <v-text-field
                                  v-model="editedItem.price"
                                  :label="$t('Price')"
                                  type="number"
                                  outlined
                                  dense
                                ></v-text-field>
                              
                                <v-select
                                  :items="Vehicles"
                                  :label="$t('Vehicles')"
                                  item-value="_id"
                                  item-text="name"
                                  v-model="editedItem.taxId"
                                  single-line
                                  return-object
                                  outlined
                                  dense
                                  
                                ></v-select>

                              </v-col> -->

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

        
        <v-col cols="2" style="background-color: #00366f; border-radius: 5px;" class="mt-3 pa-0">
          <v-container>
              
              <v-row>
                <v-col class="pb-0">
                  <v-text-field
                    :value="`${formatNumber(SaleInfo.totalVehicles)}`"
                    :label="'Vehicles'"
                    outlined
                    readonly
                    dark
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="py-0 text-start">
                  <v-text-field
                    :value="`${formatNumber(SaleInfo.totalUntaxedAmount)}`"
                    :label="'UntaxedAmount'"
                    outlined
                    readonly
                    dark
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="py-0">
                  <v-text-field
                    :value="`${formatNumber(SaleInfo.totalPrice)}`"
                    :label="'Total'"
                    outlined
                    readonly
                    dark
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="py-0">
                  <v-text-field
                    v-model="SaleInfo.discount"
                    :label="'Discount'"
                    outlined
                    dark
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="py-0">
                  <v-text-field
                    v-model="SaleInfo.payment"
                    :label="'payment'"
                    outlined
                    dark
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- <v-row>
                <v-col class="py-0">
                  <v-text-field
                    :value="`${formatNumber(editedItem.return)}`"
                    :label="$t('Return')"
                    outlined
                    readonly
                    dark
                  ></v-text-field>
                </v-col>
              </v-row> -->
          </v-container>
        </v-col>
      
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
      id: '',
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        // {
        //   text: 'Products',
        //   align: 'start',
        //   value: 'productId.name',
        // },
        // { text: 'Description', value: "productId.designation" },
        { text: 'heure départ', value: "" },
        { text: 'heure d\'arrivée', value: '' },
        { text: 'compteur départ', value: '' },
        { text: 'compteur d\'arrivée', value: '' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      e6: [],
      e7: [],
      missions: [],
      patients: [],
      SaleInfo: [],
      CustomerInfo: [],
      drivers: [],
      vehicles: [],
      companyInfo: [],
      tax_value: '',
      untaxed_value: '',
      sub_total: '',
      ancienAmount: '',
      newAmount: '',
      ancienTaxValue: '',
      confirmButton: false,
      pdfHeaders: [],
      date_of_mission: '',
      editedIndex: -1,
      editedItem: {
        productId: '',
        amount: 0,
        price: 0,
        disabled: false,
        taxId: '',
        untaxedAmount: 0,
        Vehicles: 0,
        subTotal: 0
      },
      defaultItem: {
        productId: '',
        amount: 0,
        price: 0,
        disabled: false,
        taxId: '',
        untaxedAmount: 0,
        Vehicles: 0,
        subTotal: 0
      },
    }),

    computed: {
      computedDateFormattedDate () {
        return this.editedItem.date ? moment(this.editedItem.date).locale('fr').format('dddd, MMMM Do YYYY') : ''
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
      log (e){
        console.log(e)
      },
      getBack () {
        this.$router.push({ path: `/missions`  });
      },
      confirm () {
        var self = this;
        this.$swal({
        title: "confirme Sale?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: '#FF5252',
        confirmButtonColor: '#4CAF50',
        }).then((result) => {
          if (result.isConfirmed) {

            if (self.SaleInfo.totalPrice > self.SaleInfo.discount) {
              self.SaleInfo.totalPrice = self.SaleInfo.totalPrice - self.SaleInfo.discount
              self.SaleInfo.disabled = true
              self.SaleInfo.date = Date.now()
              ipcRenderer.send('saleTotals:edit', self.SaleInfo)
              self.$swal({
              position: 'top-end',
              title: "Sale confirmed!",
              icon: "success",
              showConfirmButton: false,
              })
              self.$router.push({ path: `/missions`  });
            } else {
              self.$swal({
              
              title: "Total Sale is less then discount!",
              icon: "error",
              button: "Done!"
              })
            }
          }
        })
      },
      getBuyingPrice (value) {
        this.editedItem.price = value.salePrice
        this.editedItem.amount = 1
      },
      getCustomerInfo (value) {
        this.CustomerInfo.raison = value.raison
        this.CustomerInfo.street = value.street
        this.CustomerInfo.city = value.city
        this.CustomerInfo.state = value.state
        this.CustomerInfo.country = value.country
        this.CustomerInfo.zip = value.zip
      },
      generateReport () {
          this.$refs.html2Pdf.generatePdf()
      },
      getRouteId() {
          this.id = this.$route.params.id,
          this.initialize()
      },
      formatDate(value) {
        return moment(value).locale('fr').format("MMMM DD YYYY, h:mm:ss a")
      },

      formatNumber(value) {
        return new Intl.NumberFormat('fr', { style: 'currency', currency: 'DZD' }).format(value)
      },

      loadmissions() {
        ipcRenderer.send('missions:load', this.id),
        ipcRenderer.on('missions:get', (e, missions) => {
          this.missions = JSON.parse(missions)
          
        })
      },

      loadStockProducts() {
        ipcRenderer.send('patients:load'),
        ipcRenderer.on('patients:get', (e, patients) => {
          this.patients = JSON.parse(patients)
        })
      },

      loadSaleInfo() {
        ipcRenderer.send('saleInfo:load', this.id),
        ipcRenderer.on('saleInfo:get', (e, saleInfo) => {
          this.SaleInfo = JSON.parse(saleInfo)
          this.CustomerInfo = this.SaleInfo.customerId
        })
      },

      loadVehicles() {
        ipcRenderer.send('vehicles:load'),
          ipcRenderer.on('vehicles:get', (e, vehicles) => {
          this.vehicles = JSON.parse(vehicles)
        })
      },

      loadCompany() {
        ipcRenderer.send('companies:load'),
        ipcRenderer.on('company:get', (e, companies) => {
        companies = JSON.parse(companies)
        this.companyInfo = companies[0]
      })
      },

      loaddrivers () {
        ipcRenderer.send('drivers:load'),
        ipcRenderer.on('drivers:get', (e, drivers) => {
          this.drivers = JSON.parse(drivers)
        })
      },
      
      initialize () {
        this.loadmissions()
        this.loadStockProducts()
        this.loadSaleInfo()
        this.loadVehicles()
        this.loadCompany()
        this.loaddrivers()
      },

      editItem (item) {
        this.editedIndex = this.missions.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.ancienAmount = this.editedItem.amount
        this.untaxed_value = this.editedItem.untaxedAmount
        this.ancienTaxValue = this.editedItem.taxId.valueTax
      },

      deleteItem (item) {
        this.editedIndex = this.missions.indexOf(item)
        this.editedItem = Object.assign({}, item)
        // this.editedIndex = item._id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        ipcRenderer.send('missions:delete', this.editedItem)
        ipcRenderer.send('stock:plus', this.editedItem)
        this.subtractionTotals ()
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

      calculateVehicles (item) { 
        this.editedItem.Vehicles = item.amount * item.price * ( item.taxId.valueTax / 100 )
        this.editedItem.untaxedAmount = item.amount * item.price
      },

      calculateTotals (item) {
        this.calculateVehicles (item)
        this.editedItem.subTotal = item.amount * item.price + this.editedItem.Vehicles
        this.SaleInfo.totalPrice = this.SaleInfo.totalPrice + this.editedItem.subTotal
        this.SaleInfo.totalUntaxedAmount = this.SaleInfo.totalUntaxedAmount + this.editedItem.untaxedAmount
        this.SaleInfo.totalVehicles = this.SaleInfo.totalVehicles + this.editedItem.Vehicles

        ipcRenderer.send('saleTotals:edit', this.SaleInfo)
        
      },

      subtractionTotals () {
        this.SaleInfo.totalPrice = this.SaleInfo.totalPrice - this.editedItem.subTotal
        this.SaleInfo.totalUntaxedAmount = this.SaleInfo.totalUntaxedAmount - this.editedItem.untaxedAmount
        this.SaleInfo.totalVehicles = this.SaleInfo.totalVehicles - this.editedItem.Vehicles
      
        ipcRenderer.send('saleTotals:edit', this.SaleInfo)
      },

      updateTotals (item) {
        // calculate untaxed value
        this.untaxed_value = item.amount * item.price
        //calculate the defrence 
        let deffTaxValue;
        let deffTotal;
        let tax_value;
        let subTotal;
          if ( this.untaxed_value == item.untaxedAmount ) {
            if (this.ancienTaxValue == item.taxId.valueTax) {
              ipcRenderer.send('missions:edit', item)
            } else if (this.ancienTaxValue < item.taxId.valueTax) {
              deffTaxValue = item.taxId.valueTax - this.ancienTaxValue
              //calculate tax value for the defrence
              tax_value = item.untaxedAmount * ( deffTaxValue / 100 )
              subTotal = item.untaxedAmount + tax_value
              //update totals value
              item.subTotal = item.subTotal + subTotal
              this.SaleInfo.totalPrice = this.SaleInfo.totalPrice + subTotal
              this.SaleInfo.totalVehicles = this.SaleInfo.totalVehicles + tax_value
              
              ipcRenderer.send('saleTotals:edit', this.SaleInfo)
              ipcRenderer.send('missions:edit', item)

            } else if (this.ancienTaxValue > item.taxId.valueTax) {
              deffTaxValue = this.ancienTaxValue - item.taxId.valueTax
              //calculate tax value for the defrence
              tax_value = item.untaxedAmount * ( deffTaxValue / 100 )
              subTotal = item.untaxedAmount + tax_value

              //update totals value
              item.subTotal = item.subTotal - subTotal
              this.SaleInfo.totalPrice = this.SaleInfo.totalPrice - subTotal
              this.SaleInfo.totalVehicles = this.SaleInfo.totalVehicles - tax_value

              ipcRenderer.send('saleTotals:edit', this.SaleInfo)
              ipcRenderer.send('missions:edit', item)

            }
            
          } else if ( this.untaxed_value > item.untaxedAmount ) {
            //calculate the defrence betwen the new and the old untaxed value
            deffTotal = this.untaxed_value - item.untaxedAmount

            //calculate tax value for the defrence
            tax_value = deffTotal * ( item.taxId.valueTax / 100 )
            subTotal = deffTotal + tax_value

            //update totals value
            item.subTotal = item.subTotal + subTotal
            this.SaleInfo.totalPrice = this.SaleInfo.totalPrice + subTotal
            this.SaleInfo.totalUntaxedAmount = this.SaleInfo.totalUntaxedAmount + deffTotal
            this.SaleInfo.totalVehicles = this.SaleInfo.totalVehicles + tax_value

            //
            ipcRenderer.send('saleTotals:edit', this.SaleInfo)
            item.untaxedAmount = this.untaxed_value
            ipcRenderer.send('missions:edit', item)

          } else if ( this.untaxed_value < item.untaxedAmount ) {
            deffTotal = item.untaxedAmount - this.untaxed_value
            
            //calculate tax value for the defrence
            tax_value = deffTotal * ( item.taxId.valueTax / 100 )
            subTotal = deffTotal + tax_value

            //update totals value
            item.subTotal = item.subTotal - subTotal
            this.SaleInfo.totalPrice = this.SaleInfo.totalPrice - subTotal
            this.SaleInfo.totalUntaxedAmount = this.SaleInfo.totalUntaxedAmount - deffTotal
            this.SaleInfo.totalVehicles = this.SaleInfo.totalVehicles - tax_value

            ipcRenderer.send('saleTotals:edit', this.SaleInfo)
            item.untaxedAmount = this.untaxed_value
            ipcRenderer.send('missions:edit', item)
          }
      },

      updateStockAmount(item) {
        let stockItem = {
          productId: item.productId,
          amount: ''
        }
        let quantity;
          if ( this.ancienAmount == this.newAmount ) {
            quantity = 0;
          } else if ( this.ancienAmount > this.newAmount ) {
            quantity = this.ancienAmount - this.newAmount
            stockItem = Object.assign(stockItem, { amount: quantity })
            ipcRenderer.send('stock:plus', stockItem)
          } else if ( this.ancienAmount < this.newAmount ) {
            quantity = this.newAmount - this.ancienAmount
            stockItem = Object.assign(stockItem, { amount: quantity })
            ipcRenderer.send('stock:minus', stockItem)
          }
      },

      createProductSale (item) { 
          ipcRenderer.send('missions:add', item)  
      },

      removeAmountFromStock () {
        ipcRenderer.send('stock:minus', this.editedItem)
      },

      save () {

        this.editedItem.saleId = this.id
        if (this.editedItem.taxId == "") {
          let defaultTax = this.Vehicles.find(item => item.valueTax == 0)
          this.editedItem.taxId = defaultTax
        }
        if (this.editedIndex > -1) {
          this.newAmount = this.editedItem.amount
          this.updateStockAmount(this.editedItem)
          this.updateTotals(this.editedItem)
          // ipcRenderer.send('purchaseTotals:edit', this.PurchaseInfo)
        } else { 
        // console.log('Object', this.editedItem)
        this.calculateTotals (this.editedItem),
        this.createProductSale (this.editedItem),
        this.removeAmountFromStock ()
        // ipcRenderer.send('saleTotals:edit', this.SaleInfo)
        }
        // this.initialize()
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
