<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="posting-detail">
            <div class="content-image">
              <img :src="post.image" />
            </div>

            <div class="content-description">
              <div class="profile-header">
                <img class="profile-image" :src="post.image" />
                <span class="profile-name">{{ post.username }}</span>
              </div>

              <div class="caption">
                <img class="profile-image" :src="post.image" />
                <div class="caption-text">
                  <span class="profile-name">{{ post.username }}</span>
                  {{ post.description }}
                </div>
              </div>
            </div>
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
import axios from 'axios';

export default {
  name: 'PostingDetail',
  props: ['id'],
  data () {
    return {
      post: {}
    }
  },
  created () {
    this.loadPosting()
  },
  methods: {
    loadPosting () {
      axios.get('/posts/' + this.id)
        .then(response => {
          this.post = response.data
        })
    }
  }
}
</script>

<style scoped>
.posting-detail {
  display: flex;
  height: 550px;
  font-family: sans-serif;
}

.content-image img {
  width: 550px;
}

.profile-header {
  padding: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(219, 219, 219);
}
.profile-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
  margin-right: 10px;
}

.profile-name {
  font-weight: bold;
  font-size: 14px;
  color: #000000;
}

.caption {
  padding: 12px 16px;
  display: flex;
}

.caption-text {
  font-size: 14px;
  color: #262626;
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
  width: 935px;
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
