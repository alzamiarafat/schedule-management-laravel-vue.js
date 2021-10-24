import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/empployee/EmployeeList';
import EmployeeCreate from './components/empployee/EmployeeCreate';
import EmployeeShow from './components/empployee/EmployeeShow';
import EmployeeEdit from './components/empployee/EmployeeEdit';


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
    {
        path: '/employee/show',
        component: EmployeeShow,
    },
    {
        path: '/employee/edit',
        component: EmployeeEdit,
    },

];
