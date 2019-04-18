import Vue from 'vue';
import Router, { Route } from 'vue-router';
import login from '../components/api-login.vue';
import register from '../components/api-register.vue';
import users from '../components/api-users.vue';
import schedule from '../components/api-schedule.vue';


Vue.use(Router);

let routes = [
    { path: '/login', name: 'login', title: 'login', component: login},
    { path: '/register', name: 'register', title: 'register', component: register},
    { path: '/users', name: 'users', title: 'users', component: users},
    { path: '/schedule', name: 'schedule', title: 'schedule', component: schedule},
    // { path: '*', redirect: {name: 'login'}}
]

export default new Router({
    routes: routes,
    mode: 'history',
    fallback: true

});

