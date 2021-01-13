<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="posting">
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
                <label>Photo URL</label>
                <div class="form-input">
                  <input
                    name="photo-url"
                    v-model="photoURL"
                    v-validate="'required'"
                    type="text"
                    class="input-text"
                    :class="{'is-error': errors.has('photo-url')}"  />
                  <div class="error-message">
                    {{ errors.first('photo-url') }}
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label>Description</label>
                <div class="form-input">
                  <textarea
                    name="description"
                    v-model="description"
                    v-validate="'required'"
                    type="text"
                    class="input-text"
                    :class="{'is-error': errors.has('description')}">
                  </textarea>
                  <div class="error-message">
                    {{ errors.first('description') }}
                  </div>
                </div>
              </div>

              <div class="form-button">
                <a @click="submitPosting">Submit Posting</a>
              </div>
            </form>
          </div>

          <a @click="$emit('close')" class="modal-close">
            <img src="../assets/close.png" />
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostingForm',
  data () {
    return {
      photoURL: '',
      description: '',
      user: JSON.parse(localStorage.getItem('user')),
    }
  },
  methods: {
    submitPosting () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          axios.post('posts', {
            username: this.user.username,
            profile_pict: this.user.photoProfile,
            image: this.photoURL,
            description: this.description
          }).then(() => {
            this.$emit('success')
          })
        }
      })
    }
  }
}
</script>
  
<style scoped>
.posting {
  background-color: #ffffff;
  border-radius: 3px;
  padding: 32px;
  width: 656px;
  margin: 30px auto 0;
  font-family: sans-serif;
}
.profile-detail {
  display: flex;
  align-items: center;
  margin-bottom: 27px;
  margin-left: 21%;
}
.profile-picture img {
  text-align: right;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid rgb(219, 219, 219);
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
.form-input textarea {
  width: 100%;
  height: 80px;
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

/* popup modal base style */
.modal-close {
  position: absolute;
  width: 48px;
  height: 48px;
  top: 15px;
  right: 21px;
  cursor: pointer;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 764px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>