<template>
  <div class="setting">
    <div class="profile-detail">
      <div class="profile-picture">
        <img :src="user.photoProfile" />
      </div>
      <div class="profile-name">
        @{{ user.username }}
      </div>
    </div>

    <form>
      <div class="form-group">
        <label>Kata Sandi Lama</label>
        <div class="form-input">
          <input
            name="old-password"
            v-model="oldPassword"
            v-validate="'required'"
            type="password"
            class="input-text"
            :class="{'is-error': errors.has('old-password')}"  />
          <div class="error-message">
            {{ errors.first('old-password') }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Kata Sandi Baru</label>
        <div class="form-input">
          <input
            name="new-password"
            v-model="newPassword"
            v-validate="'required'"
            type="password"
            class="input-text"
            :class="{'is-error': errors.has('new-password')}"
            ref="password" />
          <div class="error-message">
            {{ errors.first('new-password') }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Konfirmasi Kata Sandi Baru</label>
        <div class="form-input">
          <input
            name="confirm-new-password"
            v-validate="'required|confirmed:password'"
            type="password"
            class="input-text"
            :class="{'is-error': errors.has('confirm-new-password')}" />
          <div class="error-message">
            {{ errors.first('confirm-new-password') }}
          </div>
        </div>
      </div>

      <div class="form-button">
        <a @click="submitSetting">Ubah Kata Sandi</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import bcrypt from 'bcryptjs'

export default {
  name: 'Setting',
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      oldPassword: '',
      newPassword: ''
    }
  },
  methods: {
    checkLogin() {
      return new Promise((resolve, reject) => {
        axios.post('/login', {
          email: this.user.email,
          password: this.oldPassword
        }).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)

          const errorMessage = error.response.data
          alert(errorMessage)
        })
      })
    },
    submitSetting () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.checkLogin().then(() => {
            bcrypt.hash(this.newPassword, 10, (err, hash) => {
              if (err) {
                console.error(err)
                return
              }
              
              axios.put('/users/' + this.user.id, {
                ...this.user,
                password: hash
              })
                .then(() => {
                  alert('Update password berhasil')
                }).catch((error) => {
                  const errorMessage = error.response.data
                  alert(errorMessage)
                })
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.setting {
  background-color: #ffffff;
  border-radius: 3px;
  border: 1px solid #dbdbdb;
  padding: 32px;
  width: 696px;
  margin: 30px auto 0;
  font-family: sans-serif;
}
.profile-detail {
  display: flex;
  align-items: center;
  margin-bottom: 27px;
}
.profile-picture img {
  width: 30%;
  float: right;
  text-align: right;
  border-radius: 50%;
}
.profile-name {
  width: 70%;
  margin-left: 15px;
  font-weight: 600;
  font-size: 14;
  color: #000000;
}
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}
.form-group label {
  width: 30%;
  text-align: right;
  font-size: 14px;
  color: #000000;
}
.form-input {
  width: 70%;
  margin-left: 15px;
}
.form-input input {
  width: 100%;
  height: 25px;
  border: 0.5px solid #bebebe;
  border-radius: 3px;
}
.form-button {
  margin-left: 31%;
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
}
.error-message {
  font-size: 12px;
  color: red;
  margin-top: 6px;
}
.is-error {
  border-color: red !important;
}
</style>