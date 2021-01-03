<template>
  <div class="signup">
    <div class="signup-form">
      <img class="logo" src="../assets/logo.png" />
      <form>
        <div class="form-group">
          <input
              name="email"
              v-model="email"
              v-validate="'required|email'"
              type="email"
              class="input-text"
              :class="{'is-error': errors.has('email')}"
              placeholder="Email" />
          <div class="error-message">
            {{ errors.first('email') }}
          </div>
        </div>

        <div class="form-group">
          <input
              name="full-name"
              v-model="fullName"
              v-validate="'required'"
              type="text"
              class="input-text"
              :class="{'is-error': errors.has('full-name')}"
              placeholder="Full Name" />
          <div class="error-message">
            {{ errors.first('full-name') }}
          </div>
        </div>

        <div class="form-group">
          <input
              name="username"
              v-model="username"
              v-validate="'required'"
              type="text"
              class="input-text"
              :class="{'is-error': errors.has('username')}"
              placeholder="Username" />
          <div class="error-message">
            {{ errors.first('username') }}
          </div>
        </div>

        <div class="form-group">
          <input
              name="photo-profile"
              v-model="photoProfile"
              v-validate="'required'"
              type="text"
              class="input-text"
              :class="{'is-error': errors.has('photo-profile')}"
              placeholder="Photo Profile URL" />
          <div class="error-message">
            {{ errors.first('photo-profile') }}
          </div>
        </div>

        <div class="form-group">
          <input
              name="password"
              v-model="password"
              v-validate="'required'"
              type="password"
              class="input-text"
              :class="{'is-error': errors.has('password')}"
              placeholder="Password" />
          <div class="error-message">
            {{ errors.first('password') }}
          </div>
        </div>

        <div class="form-button">
          <a @click="submitSignup">Daftar</a>
        </div>
      </form>
    </div>
    <div class="login">
      Sudah punya akun? <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default  {
  name: 'Register',
  data () {
    return {
      email: '',
      fullName: '',
      username: '',
      photoProfile: '',
      password: ''
    }
  },
  methods: {
    submitSignup () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const {email, fullName, username, photoProfile, password} = this

          axios.post('register', {
            email,
            fullName,
            username,
            photoProfile,
            password
          }).then(() => {
            alert('Registrasi berhasil, silahkan anda login')

            this.$router.push('/login')
          }).catch((error) => {
            const errorMessage = error.response.data
            alert(errorMessage)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.signup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  margin-top: 100px;
  margin-bottom: 100px;
}
.signup-form {
  background-color: #ffffff;
  width: 350px;
  padding: 40px;
  border: 1px solid #dbdbdb;
  text-align: center;
}
.logo {
  margin-bottom: 15px;
  width: 175px;
}
.form-group {
  margin-bottom: 7px;
}
.form-group input {
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  background: #fafafa;
  width: -webkit-fill-available;
  height: 40px;
  padding: 0px 9px;
  font-family: sans-serif;
  outline: none;
}
.form-button {
  margin-top: 20px;
}
.form-button a {
  cursor: pointer;
  background-color: #0095F6;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  padding: 9px;
  justify-content: center;
  align-items: center;
  display: block;
}
.error-message {
  font-size: 12px;
  color: red;
  margin-top: 6px;
  text-align: left;
  margin-bottom: 12px;
}
.is-error {
  border-color: red !important;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  width: 350px;
  padding: 40px;
  border: 1px solid #dbdbdb;
  text-align: center;
  margin-top: 20px;
}
.login a {
  cursor: pointer;
  text-decoration: none;
  color: #0095f6;
}
</style>
