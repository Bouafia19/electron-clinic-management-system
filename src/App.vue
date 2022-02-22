<template>
  <v-app id="inspire">
    <v-navigation-drawer 
      v-model="drawer"
      app
      color="next"
      dark
    >
      <v-list-item>
        <v-list-item-avatar tile>
          <v-img           
            contain
            src="./assets/icons/couleur/hospital.png"
          >
          </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
        
          <v-list-item-title class="text-h6">
            {{ 'Clinique Médical' }} 
          </v-list-item-title>
          
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon 
        color="next"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <template>
        <div class="text-center">
          <v-menu >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="next"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>

            <v-list
            dense
            nav
            >
              <v-list-item>
                <v-list-item-avatar style="margin-right: 0px; margin-top: 0px; margin-bottom: 0px;">
                  <v-icon style="justify-content: left;">mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Profil</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                @click="auth_sign_out"
              >
                <v-list-item-avatar style="margin-right: 0px; margin-top: 0px; margin-bottom: 0px;">
                  <v-icon style="justify-content: left;">mdi-logout</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            </v-list>
          </v-menu>
        </div>
      </template>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <DialogLogin />
  </v-app>
</template>

<script>
  import DialogLogin from './components/DialogLogin';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      DialogLogin
    },
    data: () => ({ 
      drawer: null,
      items: [
          { title: 'Accueil', icon: 'mdi-home', to: '/' },
          { title: 'Tableau de bord', icon: 'mdi-view-dashboard', to: '' },
          { title: 'Patients', icon: 'mdi-clipboard-account', to: '' },
          { title: 'Chauffeurs', icon: 'mdi-badge-account-horizontal', to: '/drivers' },
          { title: 'Voitures', icon: 'mdi-car', to: '' },
          { title: 'Missions', icon: 'mdi-ballot', to: '' },
          { title: 'À propos', icon: 'mdi-information', to: '/about' },
        ],
    }),

    computed: {
      ...mapGetters({
          authenticated: 'authenticated',
      }),
    },

    methods: {
      auth_sign_out () {
        this.$store.commit('account_sign_out');
      }
    }

  }
</script>