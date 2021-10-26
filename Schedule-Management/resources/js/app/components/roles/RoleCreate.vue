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
                    <h1 class="h3 mb-1 text-gray-800">Create Role</h1>

                    <!-- Content Row -->
                    <div class="row">
                        <!-- Fade In Utility -->
                        <div class="col-lg-12">
                            <div class="card position-relative">
                                <div class="card-header py-3"></div>
                                <div class="card-body">
                                    <form @submit="roleCreate">
                                        <div class="row">
                                            <div class="col-12">
                                                <label>Name</label>
                                                <input class="form-control" type="text" v-model="store.name" placeholder="Enter Name">
                                            </div>
                                        </div>
                                        <label class="mt-2">Assign Permission</label>
                                        <div class="row" v-for="result in results" :key="result">
                                            <div class="col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" :value="result.id" :id="result.id" v-model=store.permission>
                                                    <label class="form-check-label" :for="result.id">
                                                        {{ result.name }}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                            selected:  {{ store.name }}
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
        name: "RoleCreate",
        components: {
            Sidebar,
            Header
        },
        data(){
            return {
                store : {
                    name : '',
                    permission: []
                },
                results : [],
                selectedData: []
            }
        },
        mounted() {
            axios.post('/api/permission',{ token : this.$store.state.token }).then((response) => {
                this.results = response.data.result;
            });
        },
        methods : {
            roleCreate(e) {
                e.preventDefault();
                axios.post('/api/role/store', { token : this.$store.state.token , data: this.store } ).then((response) => {
                    this.$swal({
                        title: "Success",
                        text: response.data.result,
                        type: "success",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: "OK",
                        closeOnCancel: true
                    }).then(()=>{
                        // this.$router.go({name: 'permission'});
                        this.$router.push('/role');
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
                        this.$router.push('/role/create');
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
