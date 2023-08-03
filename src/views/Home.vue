<template>
  <div>
    <div v-if="isLoading" class="ui segment">
      <div class="ui active dimmer">
        <div class="ui text loader">Loading</div>
      </div>
    </div>
    
    <div v-if="!isLoading" class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
      </div>
      <!--<Article />-->
      <ArticleList :articles=articles />
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
// import { baseUrl } from '@/assets/config.js';

// const headers = {'Authorization' : 'mtiToken'};
import Article from '@/components/Article.vue';
import ArticleList from '@/components/ArticleList.vue';
import {baseUrl} from '@/assets/config.js';

export default {
  name: 'Home',

  components: {
   // 読み込んだコンポーネント名をここに記述する
   Article,
   ArticleList
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
        {userId: "jjsj", text: "展覧会に行きたい", category: "aaa", timestamp: 1691037872561},
        {userId: "jjj", text: "展覧会に行きたい", category: "ccc", timestamp: 1691037872561},
        {userId: "jjj", text: "展覧会に行きたい", category: "aaa", timestamp: 1691037872561},
        {userId: "jjj", text: "展覧会に行きたい", category: "aaa", timestamp: 1691037872561},
        {userId: "jsjj", text: "展覧会に行きたい", category: "aaa", timestamp: 1691037872561},
        {userId: "jjj", text: "展覧会に行きたい", category: "aaa", timestamp: 1691037872561},
        {userId: "jsjj", text: "展覧会に行きたい", category: "", timestamp: 1691037872561},
        {userId: "jjj", text: "展覧会に行きたい", category: "", timestamp: 1691037872561},
        {userId: "jjj", text: "展覧会に行きたい", category: "aaa", timestamp: 1691037872561},
        {userId: "jsjj", text: "展覧会に行きたい", category: "f", timestamp: 1691037872561},
        {userId: "jjj", text: "展覧会に行きたい", category: "aaa", timestamp: 1691037872561},
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
    
  // this.getArticles();
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },


  methods: {
    // Vue.jsで使う関数はここで記述する
    // isMyArticle(id) {}, // 自分の記事かどうかを判定する
    async getArticles() {
      const headers = {'Authorization': this.token};
    
      try {
            /* global fetch */
        this.isLoading = true;
        const res = await fetch(baseUrl + `/articles`,  {
          method: 'GET',
          headers
        });
  
        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}
        console.log("jsonData: ", jsonData);
  
        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        this.isLoading = false;
        console.log("jsonData: ", jsonData);
        this.articles = jsonData;
        
      } catch (e) {
        // エラー時の処理
        this.isLoading = false;
        console.log("e: ", e);
      }
    }, // 記事一覧を取得する
    // async postArticle() {}, // 記事を作成する
    // async getSearchedArticles() {}, // 記事を検索する
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
        this.isLoading = false;
        console.log("jsonData: ", jsonData);
        this.articles = jsonData;
        
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
