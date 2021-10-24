import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/empployee/EmployeeList';
import EmployeeCreate from './components/empployee/EmployeeCreate';


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
    {
        path: '/employee/create',
        component: EmployeeCreate,
    },

];
