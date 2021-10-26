import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import PermissionList from './components/permissions/PermissionList';
import PermissionCreate from './components/permissions/PermissionCreate';
import RoleList from './components/roles/RoleList';
import RoleCreate from './components/roles/RoleCreate';
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
        name: 'permission',
        path: '/permission',
        component: PermissionList,
    },
    {
        name: 'permission.create',
        path: '/permission/create',
        component: PermissionCreate,
    },
    {
        name: 'role',
        path: '/role',
        component: RoleList,
    },
    {
        name: 'role.create',
        path: '/role/create',
        component: RoleCreate,
    },
    {
        name: 'employee',
        path: '/employee',
        component: EmployeeList,
    },
    {
        path: '/employee/create',
        component: EmployeeCreate,
    },
    {
        name: 'employee.show',
        path: '/employee/show',
        component: EmployeeShow,
    },
    {
        name: 'employee.edit',
        path: '/employee/edit/:id',
        component: EmployeeEdit,
    },

];
