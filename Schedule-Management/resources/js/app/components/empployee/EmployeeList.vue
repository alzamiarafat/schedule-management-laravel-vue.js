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
                    <h1 class="h3 mb-2 text-gray-800">Employee List</h1>

                    <!-- DataTales Example -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <button class="btn btn-primary float-right" @click="createForm">+ Add New</button>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Address</th>
                                            <th>Phone Number</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(result, index) in results" :key="result">
                                            <td>{{ index+1 }}</td>
                                            <td>{{ result.name }}</td>
                                            <td>{{ result.designation }}</td>
                                            <td>{{ result.address }}</td>
                                            <td>{{ result.phone_number }}</td>
                                            <td v-if="result.status === 1" class="text-success">Active</td>
                                            <td v-else class="text-danger">Deactive</td>
                                            <td>
                                                <a type="button" class="btn btn-info" @click="show"><i class="fa fa-eye"></i></a>
                                                <a type="button" class="btn btn-secondary" @click="edit"><i class="fa fa-edit"></i></a>
                                                <a type="button" v-if="result.status === 0" class="btn btn-success" @click="changeStatus(result.id)"><i class="fa fa-check-square"></i></a>
                                                <a type="button" v-if="result.status === 1" class="btn btn-warning" @click="changeStatus(result.id)"><i class="fa fa-ban"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
        name: "EmployeeList",
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
            axios.post('/api/employees',{ token : this.$store.state.token }).then((response) => {
                this.results = response.data.result;
                this.$router.push('/employee');
            });
        },
        methods: {
            createForm() {
                this.$router.push('/employee/create');
            },
            show() {
                this.$router.push('/employee/show');
            },
            edit() {
                this.$router.push('/employee/edit');
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




