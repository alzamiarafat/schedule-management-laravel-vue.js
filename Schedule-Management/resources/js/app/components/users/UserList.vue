<template>
   <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <Sidebar />
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <Header />
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <h1 class="h3 mb-2 text-gray-800">User List</h1>

                    <!-- DataTales Example -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <router-link :to="{name: 'user.create'}" class="btn btn-primary float-right"><i class="fa fa-plus" ></i> Add New</router-link>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Role</th>
                                            <!-- <th>Permission</th> -->
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(result, index) in results" :key="result.id">
                                            <td>{{ index+1 }}</td>
                                            <td>{{ result.name }}</td>
                                            <td>{{ result.email }}</td>
                                            <td>{{ result.contact_no }}</td>
                                            <td v-if="result.roles.length > 0">{{ result.roles[0]['name'] }}</td>
                                            <td v-else class="text-danger">There is no role selected</td>
                                            <td>
                                                <router-link :to="{name: 'employee.show', params: { id: result.id }}" class="btn btn-info" title="Show" data-toggle="tooltip" data-placement="top"><i class="fa fa-eye" ></i></router-link>
                                                <router-link :to="{name: 'user.edit', params: { id: result.id, user: result }}" class="btn btn-secondary"  title="Edit" data-toggle="tooltip" data-placement="top"><i class="fa fa-edit"></i></router-link>
                                                <a type="button" v-if="result.status === 0" class="btn btn-success" @click="changeStatus(result.id)" title="Active" data-toggle="tooltip" data-placement="top"><i class="fa fa-check-square"></i></a>
                                                <a type="button" v-if="result.status === 1" class="btn btn-warning" @click="changeStatus(result.id)" title="Dective" data-toggle="tooltip" data-placement="top"><i class="fa fa-ban"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- <table v-if="loading" class="table table-bordered text-center" width="100%" cellspacing="0">
                                    <tbody>
                                        <div class="spinner-border text-info mt-3 mb-3" style="width: 3rem; height: 3rem;" role="status"></div>
                                    </tbody>
                                </table> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from '../layout/Sidebar.vue';
    import Header from '../layout/Header.vue';
    import Vue from 'vue';
    import VueSwal from 'vue-swal';

    Vue.use(VueSwal)

    export default {
        name: "UserList",
         components: {
            Sidebar,
            Header
        },
        data() {
            return {
                results : [],
            }
        },
        mounted() {
            this.getAllUser();
        },
        methods: {
            getAllUser() {
                axios.post('/api/user',{ token : this.$store.state.token }).then((response) => {
                    this.results = response.data.result;
                    this.$router.push('/user');
                });
            },

            changeStatus(id) {
                axios.post('/api/employees/change-status',{ token : this.$store.state.token, id:id }).then((response) => {
                    this.$swal({
                        title: "Success",
                        text: response.data.result,
                        type: "success",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: "OK",
                        closeOnCancel: true
                    }).then(()=>{
                        this.$router.go('/employee');
                    });
                });
            }
        }
    }
</script>




