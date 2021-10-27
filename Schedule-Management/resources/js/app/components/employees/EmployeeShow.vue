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
                    <h1 class="h3 mb-1 text-gray-800">Employee Details</h1>

                    <!-- Content Row -->
                    <div class="row">
                        <!-- Fade In Utility -->
                        <div class="col-lg-12">

                            <div class="card position-relative">
                                <div class="card-header py-3"></div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-6">
                                            <label>Name</label>
                                            <h4 v-text="result.name"></h4>
                                        </div>
                                        <div class="col-6">
                                            <label>Designation</label>
                                            <h4 v-text="result.designation"></h4>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <label>Phone Number</label>
                                            <h4 v-text="result.phone_number"></h4>
                                        </div>
                                        <div class="col-6">
                                            <label>Address</label>
                                            <h4 v-text="result.address"></h4>
                                        </div>
                                    </div>
                                    <br>
                                    <router-link :to="{name: 'employee'}" class="btn btn-primary float-right">Back</router-link>
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
        name: "EmployeeShow",
        components: {
            Sidebar,
            Header
        },
        data(){
            return {
                result: {}
            }
        },
        mounted() {
            axios.post('/api/employees/show',{ token : this.$store.state.token, id: this.$route.params.id}).then((response) => {
                this.result = response.data.result;
            });
        }
    }
</script>

<style scoped>

</style>
