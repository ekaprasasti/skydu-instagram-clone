<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  created() {
    axios.interceptors.response.use(undefined, (err) => {
      if (err.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        this.$router.push('/login')
      }

      throw err;
    });
  }
}
</script>
