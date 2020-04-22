import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#0090D6',
            }
        },
    },
})

export default vuetify;

/*
export default new Vuetify({
});
 */
