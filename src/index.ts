import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';


// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';
import './assets/sass/layout.scss';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import '@fortawesome/fontawesome-free/scss/brands.scss';
import '@fortawesome/fontawesome-free/scss/v4-shims.scss';
// import 'mdbvue/build/css/mdb.css'


// JS
import 'jquery';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';


Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    watch: {
        '$route' (to, from) {
        }
    }
});

