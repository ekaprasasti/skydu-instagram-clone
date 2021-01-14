<template>
  <div>
    <div class="home">
      <div class="feed">
        <div v-for="post in posts" :key="post.id" class="posting">
          <div class="posting-header">
            <img class="posting-profile-image" :src="post.profile_pict" />
            <span class="posting-profile-name">{{ post.username }}</span>
          </div>

          <div class="posting-image">
            <a @click="openModal(post.id)">
              <img :src="post.image" />
            </a>
          </div>

          <div class="posting-description">
            <span class="posting-profile-name">{{ post.username }}</span>
            {{ post.description }}
          </div>
        </div>
      </div>

      <div class="sidebar-container">
        <div class="sidebar">
          <div class="sidebar-profile-image">
            <img :src="user.photoProfile" />
          </div>
          
          <div class="sidebar-profile-name">
            <div class="username">@{{ user.username }}</div>

            <div class="name">{{ user.fullName }}</div>
          </div>
        </div>

        <a @click="openPostingForm = true">Post</a>
      </div>
    </div>

    <PostingDetail
      v-if="openPostingModal"
      @close="openPostingModal = false"
      :id="postingDetailId" />
    
    <PostingForm
      v-if="openPostingForm"
      @close="openPostingForm = false"
      @success="successPostingForm"
    />
  </div>
</template>

<script>
import PostingDetail from '@/components/PostingDetail.vue'
import PostingForm from '@/components/PostingForm.vue'
import axios  from "axios";

export default {
  name: 'Home',
  components: {
    PostingDetail,
    PostingForm
  },
  data () {
    return {
      openPostingModal: false,
      openPostingForm: false,
      posts: [],
      user: JSON.parse(localStorage.getItem('user')),
      postingDetailId: null,
    }
  },
  created() {
    this.loadPosts()
  },
  methods: {
    loadPosts () {
      axios.get('/posts').then(response => {
        this.posts = response.data
      })
    },
    openModal (id) {
      this.postingDetailId = id
      this.openPostingModal = true
    },
    successPostingForm () {
      this.openPostingForm = false
      this.loadPosts()
    }
  }
}
</script>

<style scoped>
/* posting */
.home {
  padding: 30px 200px;
  display: flex;
  width: 50%;
  margin: 0 auto;
  font-family: sans-serif;
}
.posting {
  background-color: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 2px;
  width: 618px;
  margin-bottom: 29px;
}
.posting-header {
  padding: 16px;
  display: flex;
  align-items: center;
}
.posting-profile-image {
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
  margin-right: 13px;
}
.posting-profile-name {
  font-weight: 600;
  font-size: 14;
}
.posting-image {
  cursor: pointer;
}
.posting-image img {
  width: 100%;
}
.posting-description {
  padding: 9px 15px 17px 15px;
  color: #262626;
}

/* sidebar */
.sidebar-container {
  display: flex;
  align-items: center;
  height: 100px;
}
.sidebar-container a {
  margin-left: 50px;
  font-size: 15px;
  color: #3EA5F6;
  font-weight: bold;
  cursor: pointer;
}
.sidebar {
  margin-left: 28px;
  align-items: center;
  display: flex;
  height: 70px;
}
.sidebar-profile {
  margin-top: 18px;
  margin-bottom: 10px;
}
.sidebar-profile-image img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid rgb(219, 219, 219);
  margin-right: 20px;
}
.sidebar-profile-name .username {
  font-weight: 600;
  font-size: 14;
  margin-bottom: 2px;
}
.sidebar-profile-name .name {
  font-weight: 350;
  font-size: 12px;
  color: #8e8e8e;
}
</style>