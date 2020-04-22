<template>
    <v-stepper v-model="formstep">

        <v-stepper-header>

            <v-stepper-step :complete="formstep > 1" step="1">Ihre Ziele</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="formstep > 2" step="2">Besonderheiten/Was soll berücksichtigt werden?</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="3" :complete="formSendSuccessfully">Ihr individuelles Angebot</v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>

            <v-stepper-content step="1" justify="center" align="center">

                <v-row>
                    <v-col>
                        <h2>1.	Was ist Ihr Hauptziel mit Ihrer neuen Webseite?</h2>
                    </v-col>

                </v-row>
                <v-row justify="center" align="center">

                    <v-col cols="12" lg="6" md="6" sm="12">

                        <v-form justify="center" align="center">

                            <v-radio-group v-model="packageSelection" column>
                                <div v-for="option in availablePackages" :key="option.id" class="mb-5">
                                    <v-radio :label="option.description" :value="option"></v-radio>
                                </div>
                            </v-radio-group>

                        </v-form>

                    </v-col>

                </v-row>

                <v-btn color="primary" @click="formstep = 2" :disabled="packageSelection == null">Weiter</v-btn>

            </v-stepper-content>

            <v-stepper-content step="2" justify="center" align="center">

                <v-row>

                    <v-col>
                        <h2>2.Was ist für Sie noch wichtig? Was soll berücksichtigt werden?</h2>
                        <p>Mehrfachauswahl möglich</p>
                    </v-col>

                </v-row>

                <v-row justify="center" align="center">
                    <v-col cols="12" lg="4" md="4" sm="12">
                        <v-form justify="center" align="center">
                            <div v-for="option in availableExtras" :key="option.id">
                                <v-checkbox :label="option.description" :value="option" v-model="extrasSelection"></v-checkbox>
                            </div>
                        </v-form>
                    </v-col>
                </v-row>

                <v-btn color="primary" @click="formstep = 3">Weiter</v-btn>

            </v-stepper-content>

            <v-stepper-content step="3">

                <div v-if="!formSendSuccessfully">

                    <v-row justify="center" align="center">

                        <v-col justify="center" align="center">
                            <h2>3. Unser Angebot für Sie</h2>
                            <div class="mt-12 mb-12 pa-12" style="font-size: 1.25em; font-weight: bolder; background: #0090D6; color: #fff">
                                Paket L - 2000,00 bis 10000,00€
                            </div>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col cols="12" lg="6" md="6" sm="12">

                            <h3 class="mb-6">Ihre Auswahl</h3>

                            <div v-if="packageSelection != null">
                                <h4>Paket:</h4>
                                <p>{{packageSelection.description}}</p>
                            </div>

                            <div v-if="extrasSelection.length > 0" class="mb-5">
                                <h4>Gewählte Zubuchoptionen:</h4>
                                <ul v-for="extra in extrasSelection" :key="extra.id">
                                    <li>{{extra.description}}</li>
                                </ul>
                            </div>

                            <div v-else>
                                <h4>Gewählte Zubuchoptionen:</h4>
                                <p>Keine Zubuchoptionen gewählt.</p>
                            </div>

                        </v-col>

                        <v-col cols="12" lg="6" md="6" sm="12">

                            <h3>Wie können wir Sie erreichen?</h3>

                            <v-form v-model="leadInfos.valid">

                                <v-text-field
                                        v-model="leadInfos.practiceName"
                                        label="Name der Praxis*"
                                        :rules="generalRules"
                                        required
                                ></v-text-field>

                                <v-text-field
                                        v-model="leadInfos.contactName"
                                        label="Name des Ansprechpartners*"
                                        :rules="generalRules"
                                        required
                                ></v-text-field>

                                <v-text-field
                                        v-model="leadInfos.city"
                                        label="Ort*"
                                        :rules="generalRules"
                                        required
                                ></v-text-field>

                                <v-text-field
                                        v-model="leadInfos.contactMail"
                                        label="E-Mail*"
                                        :rules="emailRules"
                                        required
                                ></v-text-field>

                                <v-text-field
                                        v-model="leadInfos.contactPhone"
                                        label="Tel*"
                                        :rules="generalRules"
                                        required
                                ></v-text-field>

                                <span style="font-size: 0.75em;"> Mit * markierte Felder sind Pflichtfelder</span>

                            </v-form>

                            <v-btn color="primary" @click="formSendSuccessfully = true" :disabled="!leadInfoIsValid()">Mein kostenloses und unverbindliches Angebot anfordern</v-btn>

                        </v-col>

                    </v-row>

                </div>

                <div v-else>

                    <v-row>

                        <v-col justify="center" align="center">
                            <h1>Vielen Dank für Ihre Anfrage!</h1>
                            <p>Ein Mitarbeiter unseres Teams, wird sich zeitnah mit Ihnen in Verbindung setzen.</p>
                            <p>Ihr Arzttermine.de - Team</p>
                        </v-col>

                    </v-row>

                </div>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
    export default {
        name: "MultiStepForm",
        methods: {
            alertSth(rowInput) {
                alert(rowInput);
            },
            leadInfoIsValid() {
                if( !this.leadInfos.contactMail || !this.leadInfos.contactPhone || !this.leadInfos.practiceName || !this.leadInfos.contactName || !this.leadInfos.city ) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        data () {
            return {
                formstep: 1,
                packageSelection: null,
                extrasSelection: [],
                availablePackages: [
                    {
                        id: 1,
                        description: 'Ich bin gerne auf dem neuesten Stand der Technik und möchte Praxisprozesse effizienter gestalten'
                    },
                    {
                        id: 2,
                        description: 'Ich möchte meine Patienten mit relevanten Informationen über die Praxis versorgen und Neupatienten von unseren Leistungen überzeugen'
                    },
                    {
                        id: 3,
                        description: 'Ich möchte meine Webseite als wichtigstes Marketinginstrument nutzen und Patienten abholen, wo sie suchen'
                    },
                    {
                        id: 4,
                        description: 'Eine Webseite gehört mittlerweile einfach zum Standardrepertoire'
                    }
                ],
                availableExtras: [
                    {
                        id: 1,
                        description: 'Rechtliche und technische Absicherung'
                    },
                    {
                        id:2,
                        description: 'Regelmäßige Pflege der Webseite & persönliche Kundenbetreuung'
                    },
                    {
                        id:3,
                        description: 'Professionelle Praxis- und Teamfotos'
                    },
                    {
                        id:4,
                        description: 'Steigerung der Auffindbarkeit in Suchmaschinen wie z.B. Google'
                    },
                    {
                        id:5,
                        description: 'Steigerung der Patientenzufriedenheit und der Praxiseffizienz'
                    }
                ],
                leadInfos: {
                    valid: false,
                    practiceName:null,
                    contactName:null,
                    city:null,
                    contactMail:null,
                    contactPhone:null
                },
                generalRules: [
                    v => !!v || 'Bitte füllen Sie dieses Feld aus!'
                ],
                emailRules: [
                    v => !!v || 'Bitte füllen Sie dieses Feld aus!',
                    v => /.+@.+/.test(v) || 'Bitte geben Sie eine gültige E-Mailadresse an',
                ],
                formSendSuccessfully: false
            }
        }
    }
</script>

<style>
    input[type="radio"] {
        display: none;
    }
    .descript {
        background: #0090D6;
        color: #fff;
        height: auto;
        padding: 50px;
    }
    input[type="radio"]:checked + p.descript {
        background: red;
    }
</style>
