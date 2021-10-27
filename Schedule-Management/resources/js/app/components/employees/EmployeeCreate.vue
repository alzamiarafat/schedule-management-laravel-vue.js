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
                    <h1 class="h3 mb-1 text-gray-800">Add Employee</h1>

                    <!-- Content Row -->
                    <div class="row">
                        <!-- Fade In Utility -->
                        <div class="col-lg-12">

                            <div class="card position-relative">
                                <div class="card-header py-3"></div>
                                <div class="card-body">
                                    <form @submit="employeeCreate">
                                        <div class="row">
                                            <div class="col-6">
                                                <label>Name</label>
                                                <input class="form-control" type="text" v-model="name" placeholder="Enter Name">
                                                <!-- <p class="text-danger" v-text="errors.nameError"></p> -->
                                            </div>
                                            <div class="col-6">
                                                <label>Designation</label>
                                                <input class="form-control" name="designation" v-model="designation" placeholder="Enter Desingation">
                                                <!-- <p class="text-danger" v-text="errors.designationError"></p> -->
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label>Phone Number</label>
                                                <input class="form-control" name="phone_number" v-model="phone_number" placeholder="Enter Phone Number">
                                                <!-- <p class="text-danger" v-text="errors.phoneNumberError"></p> -->
                                            </div>
                                            <div class="col-6">
                                                <label>Address</label>
                                                <input class="form-control" name="address" v-model="address" placeholder="Enter Address">
                                                <!-- <p class="text-danger" v-text="errors.addressError"></p> -->
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
        name: "EmployeeCreate",
        components: {
            Sidebar,
            Header
        },
        data(){
            return {
                store : {
                    name : '',
                    designation : '',
                    phone_number : '',
                    address : ''
                },
                loading : true,
                errors: {
                    nameError: '',
                    designationError: '',
                    phoneNumberError: '',
                    addressError: ''
                }
            }
        },
        mounted() {
            if (this.$store.state.token !== ''){
                axios.post('/api/check-token', { token : this.$store.state.token }).then((response) => {
                    if (response){
                        this.loading = false;
                    }
                }).catch(err => {
                    this.loading = false;
                    this.$router.push('/login');
                })
            }else {
                this.loading = false;
                this.$router.push('/login');
            }
        },
        methods : {
            employeeCreate(e) {
                e.preventDefault();
                var formData = {
                    'name': this.name,
                    'designation': this.designation,
                    'phone_number': this.phone_number,
                    'address': this.address,
                };
                axios.post('/api/employees/store', { token : this.$store.state.token , data: formData } ).then((response) => {
                    this.$swal({
                        title: "Success",
                        text: response.data.result,
                        type: "success",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: "OK",
                        closeOnCancel: true
                    }).then(()=>{
                        this.$router.push('/employee');
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
                        this.$router.push('/employee/create');
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
