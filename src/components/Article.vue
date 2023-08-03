<template>
 <div class="article">
     <div class="head">
         <div class="user-id">{{authorId}}</div>
         <div class="timestamp">{{formatDate}}</div>
     </div>
     <div class="content">
         {{content}}
     </div>
     <div :v-if="isAuthor || category" class="bottom">
         <div v-if="isCategory" class="category">{{category}}</div>
         <button v-if="isAuthor" class="mini negative ui button" @click.prevent="deleteArticle({userId: authorId, timestamp})" >削除</button>
     </div>
 </div>
</template>

<script>
export default {
  name: 'Article',
  computed: {
      isAuthor() {
          return this.authorId === this.userId;
      },
      formatDate() {
        const timestampInMilliseconds = this.timestamp; // ここにDate.now()で得られた値を代入する
        const dateObj = new Date(timestampInMilliseconds);
        const formattedDateTime = dateObj.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
        return formattedDateTime;
      },
      isCategory() {
          return this.category !== "";
      }
  },
  props: {
    authorId: {
        type: String,
        required: true,
        default: ""
    }, 
    timestamp: {
        type: Number,
        required: true,
        default: ""
    }, 
    content: {
        type: String,
        required: true,
        default: ""
    }, 
    category: {
        type: String,
        required: false,
        default: ""
    }, 
    deleteArticle: {
        type: Function,
        required: true
    }
  },
  data() {
      return {
        token: window.localStorage.getItem("token"),
        userId: window.localStorage.getItem("userId")
      }
  },
  methods: {
      deleteArticle() {
          
      }
  }
};
</script>

<style scoped >
    .article {
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
        row-gap: .7rem;
        border-bottom: 3px solid #ccc;
    }
    
    .head {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        column-gap: .3rem;
    }
    .user-id {
        font-size: 1.3rem;
        font-weight: bold;
    }
    .timestamp {
        color: gray;
        font-size: .8rem;
    }
    .content {
        font-size: 1.2rem;
        font-weight: bold;
    }
    .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .category {
        padding: .15rem .6rem;
        color: white;
        background-color: #21BA45;
        border-radius: 10px;
    }
</style>