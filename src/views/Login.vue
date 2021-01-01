<template>
  <div class="login">
    <div class="app-background">
      <img src="../assets/login-picture.png" />
    </div>
    <div class="login-form">
      <img class="logo" src="../assets/logo.png" />

      <form>
        <div class="form-group">
          <input
            name="email"
            v-validate="'required|email'"
            type="email"
            class="input-text"
            :class="{'is-error': errors.has('email')}"
            placeholder="email" />
          <div class="error-message">
            {{ errors.first('email') }}
          </div>
        </div>

        <div class="form-group">
          <input
            name="password"
            v-validate="'required'"
            type="password"
            class="input-text"
            :class="{'is-error': errors.has('email')}"
            placeholder="password" />
          <div class="error-message">
            {{ errors.first('password') }}
          </div>
        </div>

        <div class="form-button">
          <a @click="submitLogin">Log In</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    submitLogin () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  font-family: sans-serif;
}
.login-form {
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
</style>