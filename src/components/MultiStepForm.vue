<template>
    <v-stepper id="stepper" v-model="formstep">

        <v-stepper-header>

            <v-stepper-step :complete="formstep > 1" step="1" :editable="editable">Ihre Ziele</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="formstep > 2" step="2" :editable="editable">Besonderheiten/Was soll berücksichtigt werden?</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="3" :complete="formSentSuccessfully" :editable="packageSelection">Ihr individuelles Angebot</v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>

            <v-stepper-content step="1" justify="center" align="center">

                <v-row>
                    <v-col>
                        <h2>1.	Was ist Ihr Hauptziel mit Ihrer neuen Website?</h2>
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
                    <div v-if="packageSelection == null" id="missing-step-one-warning">Um fortzufahren, wählen Sie in Schritt 1 bitte ein Ziel!</div>

                </v-row>

                <v-btn block color="primary" :disabled="packageSelection == null" @click="formstep = 3">Weiter</v-btn>

            </v-stepper-content>

            <v-stepper-content step="3">

                <div v-if="!formSent">

                    <v-row justify="center" align="center">

                        <v-col justify="center" align="center">
                            <h2>3. Unser Angebot für Sie</h2>
                            <div id="offerbox" class="mt-12 mb-6 pa-6">
                                <p v-if="packageSelection && extrasSelection">Wir empfehlen Ihnen unser<br><span style="font-size: 1.5em; font-weight: bold;">{{packageSelection.packageName}}</span><br>ca. {{packageSelection.packagePriceMin.toFixed(2)}} € - {{ calculatePriceSpan }} €</p>
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
                                <h4>Gewählte Zubuchungsoptionen:</h4>
                                <ul v-for="extra in extrasSelection" :key="extra.id">
                                    <li>{{extra.description}} - {{extra.priceDisplayed}}</li>
                                </ul>
                            </div>

                            <div v-else>
                                <h4>Gewählte Zubuchungsoptionen:</h4>
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
                                        label="PLZ & Ort*"
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
                                        :rules="phoneRules"
                                        required
                                ></v-text-field>

                                <v-checkbox v-model="dsgvoAccepted">
                                    <template v-slot:label>
                                        <div>Ich habe die &nbsp; <a target="_blank" href="http://mein-invita.de/datenschutzerklaerung">Datenschutzbestimmungen</a> gelesen und akzeptiere diese.</div>
                                    </template>
                                </v-checkbox>

                                <span style="font-size: 0.75em;"> Mit * markierte Felder sind Pflichtfelder</span>

                                <v-btn block color="primary" @click="sendLeadInfo" :disabled="!leadInfoIsValid()" style="white-space: normal;
word-wrap: break-word;">Mein kostenloses und unverbindliches Angebot anfordern</v-btn>

                            </v-form>

                        </v-col>

                    </v-row>

                </div>

                <div v-else-if="formSent && formSentSuccessfully">

                    <v-row>

                        <v-col justify="center" align="center" style="margin-top: 80px;">
                            <v-icon x-large color="#87BF34">check_circle_outline</v-icon>
                            <br/><br/>
                            <h1>Vielen Dank für Ihre Anfrage!</h1>
                            <p>Ein Mitarbeiter unseres Teams, wird sich zeitnah mit Ihnen in Verbindung setzen.</p>
                            <p>Ihr Arzttermine.de - Team</p>
                        </v-col>

                    </v-row>

                </div>

                <div v-else>

                    <v-row>

                        <v-col justify="center" align="center" style="margin-top: 80px;">
                            <v-icon x-large color="red">error_outline</v-icon>
                            <br/><br/>
                            <h1>Fehler beim Senden der Anfrage!</h1>
                            <p>Leider konnte Ihre Anfrage nicht verarbeitet werden!<br/>Bitte versuchen Sie es erneut, oder wenden Sie sich direkt an unseren kostenlosen Kundensupport unter:<br/> <a href="tel:08002222133" style="font-size: 1.25em;">0800 22 22 133</a>.</p>
                            <p>Ihr Arzttermine.de - Team</p>
                        </v-col>

                    </v-row>

                </div>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
    import axios from "axios";
    export default {
        name: "MultiStepForm",
        data () {
            return {
                editable: true,
                formstep: 1,
                packageSelection: null,
                extrasSelection: [],
                availablePackages: [
                    {
                        id: 1,
                        packageName: 'Website Paket Plus',
                        packagePriceMin: 7781.00,
                        packagePriceMax: 8950.00, // Minpreis + 15%
                        description: 'Ich bin gerne auf dem neuesten Stand der Technik und möchte Praxisprozesse effizienter gestalten.'
                    },
                    {
                        id: 2,
                        packageName: 'Website Paket Plus',
                        packagePriceMin: 7781.00,
                        packagePriceMax: 8950.00, // Minpreis + 15%
                        description: 'Ich möchte meine Patienten mit relevanten Informationen über die Praxis versorgen und Neupatienten von unseren Leistungen überzeugen.'
                    },
                    {
                        id: 3,
                        packageName: 'Website Paket Plus',
                        packagePriceMin: 7781.00,
                        packagePriceMax: 8950.00, // Minpreis + 15%
                        description: 'Ich möchte meine Website als wichtigstes Marketinginstrument nutzen und Patienten abholen, wo sie suchen.'
                    },
                    {
                        id: 4,
                        packageName: 'Website Paket Basic',
                        packagePriceMin: 3392.00,
                        packagePriceMax: 3900.00, // Minpreis + 15%
                        description: 'Eine Website gehört mittlerweile einfach zum Standardrepertoire.'
                    }
                ],
                availableExtras: [
                    {
                        id: 1,
                        description: 'DSGVO Paket - Ihre rechtliche Absicherung (empfohlen).',
                        price: 19.95,
                        twoYearPrice: 478.8,
                        priceDisplayed: 'mtl. 19.95 €'
                    },
                    {
                        id: 2,
                        description: 'SSL Zertifikat für sichere Datenübertragung (empfohlen).',
                        price: 9.95,
                        twoYearPrice: 238.8,
                        priceDisplayed: 'mtl. 9.95 €'
                    },
                    {
                        id: 3,
                        description: 'Regelmäßige Updates und Wartung Ihrer Website.',
                        price: 19.95,
                        twoYearPrice: 478.8,
                        priceDisplayed: 'mtl. 19.95 €'
                    },
                    {
                        id: 4,
                        description: 'Erstellung professioneller Praxis- und Teamfotos.',
                        price: 400.00,
                        twoYearPrice: 400.00,
                        priceDisplayed: 'einmalig 400 €'
                    },
                    {
                        id: 5,
                        description: 'Inhaltspflege der Website und Umsetzung von Änderungswünschen mit persönlicher Kundenbetreuung.',
                        price: 39.95,
                        twoYearPrice: 958.8,
                        priceDisplayed: 'mtl. 39.95 €'
                    },
                    {
                        id: 6,
                        description: 'Steigerung der Auffindbarkeit in Suchmaschinen wie z.B. Google.',
                        price: 9.95,
                        twoYearPrice: 238.8,
                        priceDisplayed: 'mtl. 9.95 €'
                    },
                    {
                        id: 7,
                        description: 'Sprachassistenten optimierte Website-Erstellung und Yelp Eintrag.',
                        price: 9.95,
                        twoYearPrice: 238.8,
                        priceDisplayed: 'mtl. 9.95 €'
                    },
                    {
                        id: 8,
                        description: 'Online Rezept und Online Überweisung für Ihre Patienten.',
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
                dsgvoAccepted: false,
                leadInfoErrors: false,
                generalRules: [
                    v => !!v || 'Bitte füllen Sie dieses Feld aus!'
                ],
                emailRules: [
                    v => !!v || 'Bitte füllen Sie dieses Feld aus!',
                    v => /.+@.+/.test(v) || 'Bitte geben Sie eine gültige E-Mailadresse an!',
                ],
                phoneRules: [
                    v => !!v || 'Bitte füllen Sie dieses Feld aus!',
                    v => (!!v && v.length > 5 && v.length < 17) ||'Bitte geben Sie eine gültige Telefonnumer an!',
                ],
                formSent: false,
                formSentSuccessfully: false,
                checkIfExtraIsSelected(option) {
                    if( this.extrasSelection.indexOf(option) >= 0 ) {
                        return true;
                    }
                }
            }
        },
        methods: {
            leadInfoIsValid() {
                if(!this.dsgvoAccepted){
                    return false;
                }
                return this.leadInfos.valid;
            },
            sendLeadInfo() {
                const packageSelected = { packageName: this.packageSelection.packageName };

                let extrasSelected = [];

                this.extrasSelection.forEach( (extra) => {
                    const extraInfo = {
                        extraName: extra.description,
                        price: extra.priceDisplayed
                    };

                    extrasSelected.push(extraInfo);
                })

                const contactInfo = {
                    city: this.leadInfos.city,
                    mail: this.leadInfos.contactMail,
                    phone: this.leadInfos.contactPhone,
                    contactName: this.leadInfos.contactName,
                    practiceName: this.leadInfos.practiceName
                };

                const leadInformation = { packageSelected, extrasSelected, contactInfo };

                axios.post('http://mein-invita.atweb.arzttermine.de/lead.php', leadInformation, { headers: { 'Content-Type':'application/json' } } )
                    .then( response => {
                        if(response.status == 200 && response.data.data == "Success"){
                            this.formSent = true;
                            this.formSentSuccessfully = true;
                        }
                    })
                    .catch( error => {
                        console.log(error);
                        this.formSent = true;
                    })
                return true;
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
    @import "https://fonts.googleapis.com/css?family=Material+Icons";
    @import "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css";

    $mainColor: #005d70;

    #invita-configurator > h2 {
        font-size: 24px!important;
    }

    .v-stepper, .v-stepper__header {
        box-shadow: none !important;
    }

    input[type="radio"], input[type="checkbox"] {
        /* display: none; */
        visibility: hidden;
    }

    .v-input >>> input {
        border-style: none!important;
    }

    .descript {
        border: 1px solid $mainColor;
        background: #fff;
        color: $mainColor;
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
        padding: 0 10px;
        top: 75%;
        left:50%;
        transform: translate(-50%,-50%);
    }

    .active {
        border: 1px solid #fff;
        background: $mainColor;
        color: #fff;
        /* font-weight: bold; */
        width: 100%;
        min-height: 150px;
    }

    #missing-step-one-warning{
        width: 100%;
        font-size:1.15em;
        color: #ffffff;
        padding: 10px;
        margin-bottom: 25px;
        background: red;
    }

    #offerbox {
        font-size: 1.25em;
        font-weight: bolder;
        background: $mainColor;
        color: #fff
    }

</style>

<style scoped src="vuetify/dist/vuetify.min.css"></style>
