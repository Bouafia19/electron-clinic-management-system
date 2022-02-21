<template>
  <v-container fluid>
        <v-row >
          <v-col
            v-for="item in items"
            :key="item.title"
          >     
            
          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
               <v-list-item-avatar
                tile
                size="120"
                
              ><v-img           
                contain
                :src="item.img"
              >
                </v-img></v-list-item-avatar>
              <v-list-item-content>
                <div class="text-h5 mb-2">
                  {{ item.title }}
                </div>
                <v-list-item-title class="text-overline red--text mb-1" >
                  {{ item.model }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              </v-list-item-content>

             
            </v-list-item>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                rounded
                
                :to="item.to"
                :disabled="item.title === 'Accueil'"
                color="teal accent-4"
              >
                {{ 'Plus' }}
              </v-btn>
            </v-card-actions>
          </v-card>
               
          </v-col>
        </v-row>
     
  </v-container>
</template>

<script>
  export default {
    data: () => ({ 
      items: [
          { title: 'Accueil', img: require('../assets/icons/couleur/home.png'), to: '/', model: 'component', description: 'composant qui affiche le menu d\'accueil' },
          { title: 'Tableau de bord', img: require('../assets/icons/couleur/dashboard.png'), to: '/dashboard', model: 'component', description: 'composant qui affiche le tableau de bord' },
          { title: 'Patients', img: require('../assets/icons/couleur/hospitalisation.png'), to: 'patients', model: 'Patient', description: 'module qui gère la fonctionnalité CRUD des patient' },
          { title: 'Chauffeurs', img: require('../assets/icons/couleur/driver.png'), to: '/drivers', model: 'Driver', description: 'module qui gère la fonctionnalité CRUD des chauffeurs' },
          { title: 'Voitures', img: require('../assets/icons/couleur/car.png'), to: '/vehicules', model: 'Vehicule', description: 'module qui gère la fonctionnalité CRUD des voitures' },
          { title: 'Missions', img: require('../assets/icons/couleur/target.png'), to: '/missions', model: 'Mission', description: 'module qui gère la fonctionnalité CRUD des missions' },
          { title: 'Paramètres', img: require('../assets/icons/couleur/settings.png'), to: '/setting', model: 'component', description: 'composant qui affiche les paramètres' },
          { title: 'À propos', img: require('../assets/icons/couleur/information.png'), to: '/about', model: 'component', description: 'composant qui affiche la page À propos' }


        ],
      }),
  }
</script>

<style scoped>
  
  

</style>
