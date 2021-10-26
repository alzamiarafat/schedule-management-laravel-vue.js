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
                    <h1 class="h3 mb-1 text-gray-800">Create Permission</h1>

                    <!-- Content Row -->
                    <div class="row">
                        <!-- Fade In Utility -->
                        <div class="col-lg-12">

                            <div class="card position-relative">
                                <div class="card-header py-3"></div>
                                <div class="card-body">
                                    <form @submit="permissionCreate">
                                        <div class="row">
                                            <div class="col-12">
                                                <label>Name</label>
                                                <input class="form-control" type="text" v-model="name" placeholder="Enter Name">
                                                <!-- <p class="text-danger" v-text="errors.nameError"></p> -->
                                            </div>
                                        </div>
                                        <br>
                                        <button class="btn btn-primary float-right" type="submit">Create</button>
                                    </form>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->
</template>

<script>
    import Sidebar from '../layout/Sidebar.vue';
    import Header from '../layout/Header.vue';
    import Vue from 'vue';
    import VueSwal from 'vue-swal';

    Vue.use(VueSwal)


    export default {
        name: "PermissionCreate",
        components: {
            Sidebar,
            Header
        },
        data(){
            return {
                store : {
                    name : '',
                },
            }
        },
        methods : {
            permissionCreate(e) {
                e.preventDefault();
                var formData = {
                    'name': this.name,
                };
                axios.post('/api/permission/store', { token : this.$store.state.token , data: formData } ).then((response) => {
                    this.$swal({
                        title: "Success",
                        text: response.data.result,
                        type: "success",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: "OK",
                        closeOnCancel: true
                    }).then(()=>{
                        this.$router.push('/permission');
                    });
                    // this.$router.push('/employee');
                }).catch((errors) => {
                    this.$swal({
                        title: "Success",
                        text: response.data.result,
                        type: "error",
                        icon: 'error',
                        showCancelButton: false,
                        confirmButtonText: "OK",
                        closeOnCancel: true
                    }).then(()=>{
                        this.$router.push('/permission/create');
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
