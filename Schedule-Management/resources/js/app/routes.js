import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';


Vue.use(VueRouter);



export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/registration',
        component: Registration,
    },
    {
        path: '/dashboard',
        component: Dashboard,
    },
    {
        path: '/employee',
        component: EmployeeList,
    },

];
