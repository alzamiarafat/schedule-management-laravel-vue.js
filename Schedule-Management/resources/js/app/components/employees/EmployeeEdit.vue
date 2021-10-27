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
                    <h1 class="h3 mb-1 text-gray-800">Edit Employee</h1>

                    <!-- Content Row -->
                    <div class="row">
                        <!-- Fade In Utility -->
                        <div class="col-lg-12">

                            <div class="card position-relative">
                                <div class="card-header py-3"></div>
                                <div class="card-body">
                                    <h2></h2>
                                    <form @submit="employeeCreate">
                                        <div class="row">
                                            <div class="col-6">
                                                <label>Name</label>
                                                <input class="form-control" type="text" v-model="name" placeholder="Enter Name">
                                            </div>
                                            <div class="col-6">
                                                <label>Designation</label>
                                                <input class="form-control" name="designation" v-model="designation" placeholder="Enter Desingation">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label>Phone Number</label>
                                                <input class="form-control" name="phone_number" v-model="phone_number" placeholder="Enter Phone Number">
                                            </div>
                                            <div class="col-6">
                                                <label>Address</label>
                                                <input class="form-control" name="address" v-model="address" placeholder="Enter Address">
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
        name: "EmployeeEdit",
        components: {
            Sidebar,
            Header
        },
        mounted() {
            axios.post('/api/employees/edit',{ token : this.$store.state.token, id: this.$route.params.id}).then((response) => {
            console.log(response.data.result)

            });
            // console.log(this.$route.params.id)
        }
    }
</script>

<style scoped>

</style>
