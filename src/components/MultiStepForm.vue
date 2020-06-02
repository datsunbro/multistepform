<template>
    <v-stepper id="stepper" v-model="formstep">

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

                    <v-col cols="12" lg="12" md="12" sm="12">

                        <v-form justify="center" align="center">

                            <v-row>
                                <v-col cols="12" lg="3" md="3" sm="12" v-for="option in availablePackages" :key="option.id" class="mb-5">
                                    <div class="descript" :class="{active: packageSelection === option}">
                                        <label :for="option.id" class="description-label">{{option.description}}</label>
                                        <input type="radio" :name="option.id" :id="option.id" :value="option" v-model="packageSelection">
                                    </div>
                                </v-col>
                            </v-row>

                        </v-form>

                    </v-col>

                </v-row>

                <v-btn block color="primary" @click="formstep = 2" :disabled="packageSelection == null">Weiter</v-btn>

            </v-stepper-content>

            <v-stepper-content step="2" justify="center" align="center">

                <v-row>

                    <v-col>
                        <h2>2.Was ist für Sie noch wichtig? Was soll berücksichtigt werden?</h2>
                        <p>Mehrfachauswahl möglich</p>
                    </v-col>

                </v-row>

                <v-row justify="center" align="center">

                    <v-col cols="12" lg="12" md="12" sm="12">

                        <v-form justify="center" align="center">

                            <v-row>
                                <v-col cols="12" lg="3" v-for="option in availableExtras" :key="option.id">
                                    <div class="descript" :class="{active: checkIfExtraIsSelected(option)}">
                                        <label :for="'extra'+option.id" class="description-label">{{option.description}}
                                            <input type="checkbox" :name="'extra'+option.id" :id="'extra'+option.id" :value="option" v-model="extrasSelection">
                                        </label>
                                    </div>
                                </v-col>
                            </v-row>

                        </v-form>

                    </v-col>

                </v-row>

                <v-btn block color="primary" @click="formstep = 3">Weiter</v-btn>

            </v-stepper-content>

            <v-stepper-content step="3">

                <div v-if="!formSendSuccessfully">

                    <v-row justify="center" align="center">

                        <v-col justify="center" align="center">
                            <h2>3. Unser Angebot für Sie</h2>
                            <div class="mt-12 mb-6 pa-6" style="font-size: 1.25em; font-weight: bolder; background: #0090D6; color: #fff">
                                <p v-if="packageSelection && extrasSelection">{{packageSelection.packageName}} <br> {{packageSelection.packagePriceMax.toFixed(2)}} € - {{ calculatePriceSpan }} €</p>
                            </div>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col cols="12" lg="12" md="12" sm="12">

                            <h3 class="mb-6">Ihre Auswahl</h3>

                            <div v-if="packageSelection != null">
                                <h4>Ziel der Website:</h4>
                                <p>{{packageSelection.description}}</p>
                            </div>

                            <div v-if="extrasSelection.length > 0" class="mb-5">
                                <h4>Gewählte Zubuchoptionen:</h4>
                                <ul v-for="extra in extrasSelection" :key="extra.id">
                                    <li>{{extra.description}} - {{extra.priceDisplayed}}</li>
                                </ul>
                            </div>

                            <div v-else>
                                <h4>Gewählte Zubuchoptionen:</h4>
                                <p>Keine Zubuchoptionen gewählt.</p>
                            </div>

                        </v-col>

                        <v-col cols="12" lg="12" md="12" sm="12">

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

                                <v-btn block color="primary" @click="formSendSuccessfully = true" :disabled="!leadInfoIsValid()" style="white-space: normal;
word-wrap: break-word;">Mein kostenloses und unverbindliches Angebot anfordern</v-btn>

                            </v-form>


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
                        packageName: 'Website Paket L',
                        packagePriceMin: 6552.00,
                        packagePriceMax: 7781.00,
                        description: 'Ich bin gerne auf dem neuesten Stand der Technik und möchte Praxisprozesse effizienter gestalten'
                    },
                    {
                        id: 2,
                        packageName: 'Website Paket L',
                        packagePriceMin: 6552.00,
                        packagePriceMax: 7781.00,
                        description: 'Ich möchte meine Patienten mit relevanten Informationen über die Praxis versorgen und Neupatienten von unseren Leistungen überzeugen'
                    },
                    {
                        id: 3,
                        packageName: 'Website Paket L',
                        packagePriceMin: 6552.00,
                        packagePriceMax: 7781.00,
                        description: 'Ich möchte meine Webseite als wichtigstes Marketinginstrument nutzen und Patienten abholen, wo sie suchen'
                    },
                    {
                        id: 4,
                        packageName: 'Website Paket M',
                        packagePriceMin: 2865.00,
                        packagePriceMax: 3392.00,
                        description: 'Eine Webseite gehört mittlerweile einfach zum Standardrepertoire'
                    }
                ],
                availableExtras: [
                    {
                        id: 1,
                        description: 'DSGVO Paket - Ihre rechtliche Absicherung (empfohlen)',
                        price: 19.95,
                        twoYearPrice: 478.8,
                        priceDisplayed: 'mtl. 19.95 €'
                    },
                    {
                        id: 2,
                        description: 'SSL Zertifikat für sichere Datenübertragung (empfohlen)',
                        price: 9.95,
                        twoYearPrice: 238.8,
                        priceDisplayed: 'mtl. 9.95 €'
                    },
                    {
                        id: 3,
                        description: 'Regelmäßige Updates und Wartung Ihrer Webseite',
                        price: 19.95,
                        twoYearPrice: 478.8,
                        priceDisplayed: 'mtl. 19.95 €'
                    },
                    {
                        id: 4,
                        description: 'Erstellung professioneller Praxis- und Teamfotos',
                        price: 400.00,
                        twoYearPrice: 400.00,
                        priceDisplayed: 'einmalig 400 €'
                    },
                    {
                        id: 5,
                        description: 'Inhaltspflege der Webseite und Umsetzung von Änderungswünschen mit persönlicher Kundenbetreuung',
                        price: 39.95,
                        twoYearPrice: 958.8,
                        priceDisplayed: 'mtl. 39.95 €'
                    },
                    {
                        id: 6,
                        description: 'Steigerung der Auffindbarkeit in Suchmaschinen wie z.B. Google',
                        price: 9.95,
                        twoYearPrice: 238.8,
                        priceDisplayed: 'mtl. 9.95 €'
                    },
                    {
                        id: 7,
                        description: 'Sprachassistenten optimierte Webseitenerstellung und Yelp Eintrag ',
                        price: 9.95,
                        twoYearPrice: 238.8,
                        priceDisplayed: 'mtl. 9.95 €'
                    },
                    {
                        id: 8,
                        description: 'Online Rezept und Online Überweisung für Ihre Patienten',
                        price: 9.95,
                        twoYearPrice: 238.8,
                        priceDisplayed: 'mtl. 9.95 €'
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
                formSendSuccessfully: false,
                checkIfExtraIsSelected(option) {
                    if( this.extrasSelection.indexOf(option) >= 0 ) {
                        return true;
                    }
                }
            }
        },
        computed: {
            calculatePriceSpan() {

                if(this.extrasSelection) {
                    let maxPrice = 0;

                    let extrasSum = 0;
                    this.extrasSelection.forEach( (extra) => {
                        extrasSum += extra.twoYearPrice;
                    });

                    maxPrice = (this.packageSelection.packagePriceMax+extrasSum).toFixed(2);

                    return maxPrice;
                } else {
                    return this.packageSelection.packagePriceMax.toFixed(2);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900";
    @import "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css";

    .v-stepper, .v-stepper__header {
        box-shadow: none !important;
    }

    input[type="radio"], input[type="checkbox"] {
        /* display: none; */
        visibility: hidden;
    }

    .v-input >>> input{
        border-style: none!important;
    }

    .descript {
        border: 1px solid #0090D6;
        background: #fff;
        color: #0090D6;
        width: 100%;
        min-height: 150px;
        height: 100%;
    }

    .description-label {
        display: block;
        font-size: 0.95em;
        min-height: 100%; /* for the latest browsers which support min-height */
        height: auto !important; /* for newer IE versions */
        /* Following stuff is needed to vertically "center" the contents */
        position: relative;
        top: 75%;
        left:50%;
        transform: translate(-50%,-50%);
    }

    .active {
        border: 1px solid #fff;
        background: #0090D6;
        color: #fff;
        /* font-weight: bold; */
        width: 100%;
        min-height: 150px;
    }

</style>

<style scoped src="vuetify/dist/vuetify.min.css"></style>
