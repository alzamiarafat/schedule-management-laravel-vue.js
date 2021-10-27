require('./bootstrap');

import Vue from 'vue';
import App from './app/App';
import { routes } from "./app/routes";
import VueRouter from 'vue-router';
import { store } from './app/store';
import moment from 'moment';

Vue.filter('date', function(value) {
    if (value) {
        return moment(String(value)).format("DD MMM YY");
    }
});

const router = new VueRouter({
    routes,
    mode: 'history',
})


const app = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: app => app(App),
});
