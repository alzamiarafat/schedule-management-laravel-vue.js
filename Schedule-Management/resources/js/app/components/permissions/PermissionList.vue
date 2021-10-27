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
                    <h1 class="h3 mb-2 text-gray-800">Permission List</h1>

                    <!-- DataTales Example -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <router-link :to="{name: 'permission.create'}" class="btn btn-primary float-right"><i class="fa fa-plus"> Add New</i></router-link>

                            <!-- <button class="btn btn-primary float-right">+ Add New</button> -->
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Date Posted</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(result, index) in results" :key="index">
                                            <td>{{ index+1 }}</td>
                                            <td>{{ result.name }}</td>
                                            <td>{{ result.created_at |date }}</td>
                                            <td>
                                                <router-link :to="{name: 'permission.edit', params: { id: result.id }}" class="btn btn-secondary"  title="Edit" data-toggle="tooltip" data-placement="top"><i class="fa fa-edit"></i></router-link>
                                                <a class="btn btn-danger" title="Delete" data-toggle="tooltip" data-placement="top" @click="deleteConfirmation"><i class="fa fa-trash"></i></a>
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
        name: "PermissionList",
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
            axios.post('/api/permission',{ token : this.$store.state.token }).then((response) => {
                this.results = response.data.result;
            });
        },
        methods: {
            deleteConfirmation() {
                Swal.fire({
                    title: "Confirmation",
                    text: "Are you sure? Delete this role!",
                    type: "warning",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it !",
                    cancelButtonText: "No, cancel !",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }).then((result) => {
                    if (result.value) {
                        axios.post('/api/permission/delete', { token : this.$store.state.token } ).then((response) => {
                            this.$swal({
                                title: "Success",
                                text: response.data.result,
                                type: "success",
                                icon: 'success',
                                showCancelButton: false,
                                confirmButtonText: "OK",
                                closeOnCancel: true
                            });
                        }).catch((errors) => {
                            this.$swal({
                                title: "Error",
                                text: "Something wrong",
                                type: "error",
                                icon: 'error',
                                showCancelButton: false,
                                confirmButtonText: "OK",
                                closeOnCancel: true
                            }).then(()=>{
                                this.$router.push('/role');
                            });
                        });
                    }
                });
            }
        }
    }
</script>




