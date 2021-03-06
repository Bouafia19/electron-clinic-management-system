<template>
<v-container fluid>
  <v-data-table
    :headers="headers"
    :items="stations"
    :search="search"
    sort-by="name"
    class="elevation-4"
     :footer-props="{
        'items-per-page-text': 'Lignes par page :',           
    }"
  >
    <template v-slot:[`footer.page-text`]="items"> 
        {{ items.pageStart }} - {{ items.pageStop }} {{ 'de' }} {{ items.itemsLength }} 
    </template>



    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{ 'Stations' }}</v-toolbar-title>
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
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      :label="'Station'"
                    ></v-text-field>
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
    <template v-slot:item.actions="{ item }">
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
</v-container>
</template>

<script>
import {ipcRenderer} from "electron";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      headers: [
        {
          text: 'Station',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Date creation', value: 'created' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      stations: [],
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    }),

    computed: {
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

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
          ipcRenderer.send('stations:load'),
          ipcRenderer.on('stations:get', (e, stations) => {
          this.stations = JSON.parse(stations)
        })
      },

      editItem (item) {
        this.editedIndex = this.stations.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item._id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        ipcRenderer.send('stations:delete', this.editedIndex)
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
        if (this.editedIndex > -1) {
          ipcRenderer.send('stations:edit', this.editedItem)
        } else {
            ipcRenderer.send('stations:add', this.editedItem)
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
 
</style>