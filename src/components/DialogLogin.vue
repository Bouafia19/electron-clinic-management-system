<template>
    <v-dialog v-model="!this.$store.state.auth_login" persistent max-width="900px">
        <v-card>
            <v-card-title></v-card-title>
            <v-card-text>
                <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6" 
                    >
                        <v-img 
                            src="../assets/icons/couleur/hospital_office.png"
                            contain
                            width="100%"
                            alt="Next Challenge"
                        />
                    </v-col>
                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <v-col>
                        <v-card-title>{{ 'Connexion au compte' }}</v-card-title>
                            <v-form v-model="valid">
                                <v-container grid-list-md>
                                    <v-text-field 
                                        :label="'Nom d\'utilisateur'" 
                                        filled 
                                        v-model="username"
                                        :rules="nameRules"
                                        :counter="30"
                                        required 
                                    ></v-text-field>
                                    <v-text-field 
                                        :label="'Mot de passe'" 
                                        filled 
                                        type="password" 
                                        v-model="password" 
                                        :rules="passwordRules"
                                        :counter="8"
                                        required
                                    ></v-text-field>
                                    <v-checkbox v-model="remeber_login" :label="'Mémoriser mon login sur cet ordinateur'"></v-checkbox>
                                </v-container>
                            </v-form>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    color="next" 
                                    dark
                                    :disabled="this.valid == false"
                                    block 
                                    @click="auth_login">
                                        {{ 'Connexion' }}
                                </v-btn>
                            </v-card-actions>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "DialogLogin",
        data () {
            return {
                username: '',
                password: '',
                remeber_login: false,
                valid: false,
                nameRules: [
                    v => !!v || 'Le nom est requis',
                    v => v.length <= 30 || 'Le nom doit comporter moins de 30 caractères',
                ],
                passwordRules: [
                    v => !!v || 'Mot de passe requis',
                    v => v.length >= 8 || 'Le mot de passe doit comporter plus de 8 caractères',
                ],
            }
        },
        methods: {
            auth_login () {
                this.$store.commit('account_sign_in', {
                    username: this.username,
                    password: this.password,
                    remeber_login: this.remeber_login
                })
                this.username = '';
                this.password = '';
                this.remeber_login = false;
            }
        }
    }
</script>