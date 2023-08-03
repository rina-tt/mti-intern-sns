<template>
  <PostArticle /> 
  <router-view/>
  <div>
    <div v-if="isLoading" class="ui segment">
      <div class="ui active dimmer">
        <div class="ui text loader">Loading</div>
      </div>
    </div>
    
    <div v-if="!isLoading" class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
     
      <SearchArticle :searchFunc=getArticles />
      <ArticleList v-if="articles.length > 0" :articles=articles :deleteArticle=deleteArticle />
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
// import { baseUrl } from '@/assets/config.js';

// const headers = {'Authorization' : 'mtiToken'};
import PostArticle from "../components/PostArticle.vue";
import ArticleList from '@/components/ArticleList.vue';
import SearchArticle from '@/components/SearchArticle.vue';
import {baseUrl} from '@/assets/config.js';

export default {
  name: 'Home',

  components: {
   // 読み込んだコンポーネント名をここに記述する
   PostArticle
   ArticleList,
   SearchArticle
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      post: {
        text: null,
        category: null,
      },
      search: {
        userId: null,
        category: null,
        start: null,
        end: null,
      },
      articles: [
      ],
      iam: null,
      isLoading: false,
      token: window.localStorage.getItem('token')
    };
  },
  created() {
    const token = window.localStorage.getItem('token')
    if(!token) {
      this.$router.push({name: 'Login'})
    }
    
    this.getArticles({userId: "", category: "", startDate: undefined, endDate: undefined});
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },


  methods: {
    deleteFrontArticle({userId, timestamp}) {
     const deleteIndex = this.articles.findIndex(x => x.userId === userId && x.timestamp === timestamp);
     if(deleteIndex) {
       this.articles.splice(deleteIndex, 1);
     }
    },
    async getArticles({userId, category, startDate, endDate}) {
      const headers = {'Authorization': this.token};
    
      try {
            /* global fetch */
        this.isLoading = true;
        const res = await fetch(baseUrl + `/articles?userId=userId&category=category&startDate=startDate&endDate=endDate`,  {
          method: 'GET',
          headers
        });
  
        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}
  
        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        this.isLoading = false;
        this.articles = jsonData.articles;
        
      } catch (e) {
        // エラー時の処理
        this.isLoading = false;
        console.log("e: ", e);
      }
    },
    async deleteArticle({userId, timestamp}) {
      const headers = {'Authorization': this.token};
    
      try {
            /* global fetch */
        this.isLoading = true;
        const res = await fetch(baseUrl + `/article?userId=userId&timestamp=timestamp`,  {
          method: 'DELETE',
          headers
        });
  
        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}
  
        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        this.deleteFrontArticle({userId,timestamp})
        this.isLoading = false;
        
      } catch (e) {
        // エラー時の処理
        this.isLoading = false;
        console.log("e: ", e);
      }
    }, 
  }
}
</script>

<style scoped>
</style>
