<template>
 <div class="article-list">
     <Article v-for="(article, index) in articles" :key="index" :authorId="article.userId" :timestamp="article.timestamp" :content="article.text" :category="article.category" />
 </div>
</template>

<script>
import Article from '@/components/Article.vue';
export default {
  name: 'ArticleList',
  components: {
      Article
  },
  computed: {
      
  },
  props: {
    articles: {
        type: Array,
        required: true,
        default: []
    }  
  },
  data() {
      return {
      }
  }
};
</script>

<style scoped >
   .article-list {
       width: 85%;
       max-width: 560px;
       margin: 0 auto;
       background-color: white;
       padding: 1rem 3rem;
       display: flex;
       flex-direction: column;
       column-gap: .8rem;
   }
</style>