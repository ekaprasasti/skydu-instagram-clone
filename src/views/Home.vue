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
            <a @click="openPostingModal = true">
              <img :src="post.image" />
            </a>
          </div>

          <div class="posting-description">
            <span class="posting-profile-name">{{ post.username }}</span>
            {{ post.description }}
          </div>
        </div>
      </div>

      <div class="sidebar">
        <div class="sidebar-profile-image">
          <img src="../assets/profile-picture.png" />
        </div>
        
        <div class="sidebar-profile-name">
          <div class="username">@eka_prasasti</div>

          <div class="name">Eka Putra Prasasti</div>
        </div>
      </div>
    </div>

    <PostingDetail v-if="openPostingModal" @close="openPostingModal = false" />
  </div>
</template>

<script>
import PostingDetail from '@/components/PostingDetail.vue'
import axios  from "axios";

export default {
  name: 'Home',
  components: {
    PostingDetail
  },
  data () {
    return {
      openPostingModal: false,
      posts: []
    }
  },
  created() {
    this.loadPosts()
  },
  methods: {
    loadPosts() {
      axios.get('/posts').then(response => {
        this.posts = response.data
      })
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
.sidebar {
  margin-left: 28px;
  display: flex;
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