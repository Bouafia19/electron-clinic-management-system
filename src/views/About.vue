<template>
  <v-container>
    <v-card 
      class="rounded-card"
      elevation="6"
    >
      <v-card-title class="justify-center">
        <v-avatar size="60">
          <v-img 
              src="../assets/icons/logo.png"
              contain
              width="100%"
          />
        </v-avatar>
        
        <h2 class="ml-3 text-uppercase" style="text-indent: 10px;">
          {{ 'Eurl Next Challlenge' }}
        </h2>
       
      </v-card-title>

      <v-divider
        class="ma-4"
        inset
      >
      </v-divider>

      <v-card-text>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <h2 
                  
                  style="color: #00366f; margin: auto; text-align: center; text-decoration: underline;"
                >
                  {{ 'Bureau d\'étude et de conseil en informatique' }}
                </h2>
                <v-list>
                  <v-list-item
                    v-for="contact in contacts"
                    :key="contact.title"      
                  >
                    <v-list-item-avatar>       
                      <v-img
                        left
                        :src="contact.img">
                      </v-img>    
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title 
                        class="font-weight-black" 
                        >
                        <v-chip
                          color="pink darken-3"
                          outlined
                          class="rounded-r-xl"
                        >
                          {{ contact.title }}
                        </v-chip>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>     
            </v-row>
          </v-col>

          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

          <v-col>
            <h2 style="color: #00366f; margin: auto; text-align: center; text-decoration: underline;">{{ 'Nos services' }}</h2>
            <v-list>
              <v-list-item
                v-for="item in services"
                :key="item.title"  
              >
                <v-list-item-avatar>
                  <v-img
                    left
                    :src="item.img">
                  </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-black">
                     <v-chip
                          color="pink darken-3"
                          outlined
                          class="rounded-r-xl"
                        >
                    {{ item.title }}
                     </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card> 
  </v-container>
</template>

<script>
  export default {
    name: 'About',
    data: () => ({
      contacts: [
            { title: '036 63 93 82', img: require('../assets/icons/couleur/phone.png')},
            { title: '0552 56 96 54', img: require('../assets/icons/couleur/mobile.png')},
            { title: 'contact@nextchallenge-dz.com', img: require('../assets/icons/couleur/email.png')},
            { title: 'https://nextchallenge-dz.com', img: require('../assets/icons/couleur/google.png')},
            { title: 'Eurl Next Challenge', img: require('../assets/icons/couleur/facebook.png')},
      ],
      services: [
            { title: 'Développement d\'applications Web', img: require('../assets/icons/couleur/ruby.png')},
            { title: 'Développement d\'applications de commerce électronique', img: require('../assets/icons/couleur/nodejs.png')},
            { title: 'Développement ERP', img: require('../assets/icons/couleur/python.png')},
            { title: 'Développement d\'applications mobiles', img: require('../assets/icons/couleur/android.png')},
            { title: 'Développement d\'applications bureautiques', img: require('../assets/icons/couleur/electron.svg')},
            { title: 'UI/UX Design', img: require('../assets/icons/couleur/experience.png')},
            { title: 'Entretien et assistance', img: require('../assets/icons/couleur/gnu-bash.png')},
      ]
    })
  }
</script>

<style scoped>
  .rounded-card {
    border-radius:30px;
    color: #00366f;
    margin: 50px auto;
  }
</style>