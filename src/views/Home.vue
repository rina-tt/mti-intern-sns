<template>
  <PostArticle /> 
  <router-view/>
  <div>
    
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
// import { baseUrl } from '@/assets/config.js';

// const headers = {'Authorization' : 'mtiToken'};
import PostArticle from "../components/PostArticle.vue";

export default {
  name: 'Home',

  components: {
   // 読み込んだコンポーネント名をここに記述する
   PostArticle
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
      articles: [],
      iam: null,
    };
  },
  created() {
    const token = window.localStorage.getItem('token')
    if(!token) {
      this.$router.push({name: 'Home'})
    }
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },


  methods: {
    // Vue.jsで使う関数はここで記述する
    // isMyArticle(id) {}, // 自分の記事かどうかを判定する
    // async getArticles() {}, // 記事一覧を取得する
    // async postArticle() {}, // 記事を作成する
    // async getSearchedArticles() {}, // 記事を検索する
    // async deleteArticle(article) {}, // 記事を削除する
    // convertToLocaleString(timestamp) {} // timestampをLocaleDateStringに変換する
  }
}
</script>

<style scoped>
</style>
