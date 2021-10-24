<template>

    <div>
        <div v-if="loading">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>

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

                    <router-view></router-view>

                </div>
                <!-- End of Main Content -->

                <!-- Footer -->
                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; Your Website 2021</span>
                        </div>
                    </div>
                </footer>
                <!-- End of Footer -->

            </div>
            <!-- End of Content Wrapper -->

        </div>
        <!-- End of Page Wrapper -->
    </div>
</template>

<script>
import axios from 'axios';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';

export default {
    name: "Dashboard",
    data() {
        return {
            loading : true,
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
        // logout() {
        //     axios.post('/api/logout',{ token : this.$store.state.token }).then((response) => {
        //         this.$store.commit('clearToken');
        //         this.$router.push('/login');
        //     });
        // },
        // employeeList() {
        //     // axios.post('/api/employees',{ token : this.$store.state.token }).then((response) => {
        //         this.$router.push('/employee');
        //     // });
        // }
    },
    components: {
    Sidebar,
    Header
  }
}
</script>

<style scoped>

