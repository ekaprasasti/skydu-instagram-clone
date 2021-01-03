<template>
  <div class="header">
    <!-- logo -->
    <router-link to="/" class="logo">
      <img src="../assets/logo.png" />
    </router-link>

    <!-- search -->
    <div class="search">
      <input type="text" placeholder="Cari" />
    </div>

    <!-- profile -->
    <div @click="openProfileDropdown = !openProfileDropdown" class="profile">
      <img src="../assets/profile-picture.png" />
      <div v-if="openProfileDropdown" class="dropdown">
        <div class="menu-text">
          <router-link to="/setting">Pengaturan</router-link>
        </div>
        <div class="menu-text logout">
          <a @click="signout">Keluar</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      openProfileDropdown: false
    }
  },
  methods: {
    signout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
/* header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 0px 200px;
  height: 78px;
  border-bottom: 1px solid rgb(219, 219, 219);
  font-family: sans-serif;
}
.profile {
  position: relative;
}
.profile img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
}
.search input {
  background: #fafafa;
  border-radius: 3px;
  border: 1px solid rgb(219, 219, 219);
  width: 215px;
  height: 28px;
  padding-left: 10px;
}

/* profile dropdown */
.dropdown {
  width: 230px;
  background-color: #ffffff;
  position: absolute;
  top: 59px;
  right: -12px;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px rgba(var(--jb7,0,0,0),.0975);
}
.menu-text {
  padding: 8px 16px;
  cursor: pointer;
}
.menu-text a,
.menu-text a:focus {
  text-decoration: none;
  color: #000000;
}
.menu-text:hover {
  background-color: rgba(var(--b3f,250,250,250),1);
}
.menu-text a svg {
  margin-right: 12px;
}
.logout {
  border-top: 1px solid rgb(219, 219, 219);
}
</style>