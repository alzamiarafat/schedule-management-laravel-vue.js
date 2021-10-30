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
                    <h1 class="h3 mb-1 text-gray-800">Add User</h1>

                    <!-- Content Row -->
                    <div class="row">
                        <!-- Fade In Utility -->
                        <div class="col-lg-12">

                            <div class="card position-relative">
                                <div class="card-header py-3"></div>
                                <div class="card-body">
                                    <form @submit="userCreate">
                                        <div class="row">
                                            <div class="col-6">
                                                <label>Name</label>
                                                <input class="form-control" type="text" v-model="store.name" placeholder="Enter Name">
                                                <!-- <p class="text-danger" v-text="errors.nameError"></p> -->
                                            </div>
                                            <div class="col-6">
                                                <label>Email</label>
                                                <input class="form-control" name="email" v-model="store.email" placeholder="Enter Email">
                                                <!-- <p class="text-danger" v-text="errors.designationError"></p> -->
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label>Password</label>
                                                <input tyepe="password" class="form-control" name="password" v-model="store.password" placeholder="Enter Password">
                                                <!-- <p class="text-danger" v-text="errors.phoneNumberError"></p> -->
                                            </div>
                                            <div class="col-6">
                                                <label>Mobile Number</label>
                                                <input class="form-control" name="contact_no" v-model="store.contact_no" placeholder="Enter Mobile Number">
                                                <!-- <p class="text-danger" v-text="errors.addressError"></p> -->
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label>Role</label>
                                                <select class="form-control" v-model="store.role">
                                                    <option selected disabled value="">Select One</option>
                                                    <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                                                </select>
                                                <!-- <p class="text-danger" v-text="errors.phoneNumberError"></p> -->
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="mt-2">Assign Permission</label>
                                                <div class="row" v-for="permission in permissions" :key="permission.id">
                                                    <div class="col-12">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" :value="permission.id" :id="permission.id" v-model=store.permission>
                                                            <label class="form-check-label" :for="permission.id">
                                                                {{ permission.name }}
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
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
        name: "UserCreate",
        components: {
            Sidebar,
            Header
        },
        data(){
            return {
                store : {
                    name : '',
                    email : '',
                    contact_no : '',
                    password : '',
                    role : '',
                    permission : []
                },
                roles : [],
                permissions : [],
                errors: {
                    nameError: '',
                    designationError: '',
                    phoneNumberError: '',
                    addressError: ''
                }
            }
        },
        mounted() {
            this.getAllRoles(),
            this.getAllPermissions()
        },
        methods : {
            getAllRoles(){
                axios.post('/api/role', { token : this.$store.state.token } ).then((response) => {
                    this.roles = response.data.result;
                })
            },

            getAllPermissions(){
                axios.post('/api/permission', { token : this.$store.state.token } ).then((response) => {
                    this.permissions = response.data.result;
                })
            },

            userCreate(e) {
                e.preventDefault();
                axios.post('/api/user/store', { token : this.$store.state.token , data: this.store} ).then((response) => {
                    this.$swal({
                        title: "Success",
                        text: response.data.result,
                        type: "success",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: "OK",
                        closeOnCancel: true
                    }).then(()=>{
                        this.$router.push('/user');
                    });
                }).catch((errors) => {
                    this.$swal({
                        title: "Success",
                        text: errors,
                        type: "error",
                        icon: 'error',
                        showCancelButton: false,
                        confirmButtonText: "OK",
                        closeOnCancel: true
                    }).then(()=>{
                        this.$router.push('/user/create');
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
