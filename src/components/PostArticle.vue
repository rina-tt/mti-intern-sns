<template>
  <div class= "ui main container">
    <div class="ui segment">
      <form class="ui form" @submit.prevent="postArticle">
        <div class="field">
          <div class="ui input">
            <textarea rows="4" type="text" v-model="post.text"></textarea>
          </div><!--ui input-->
        </div><!--field-->
        
        <div class="fields">
          <div class="field">
            <div class="ui tag label">
              <input type="text" v-model="post.category" placeholder="カテゴリー" >
            </div><!--label-->
          </div><!--field-->
          
          <div class="four wide field">
            <button @click="postRequest()" class="ui  green  button right floated" type="submit">投稿</button>
          </div><!--field-->
          
        </div><!--fields-->  
      </form> <!-- ui form-->
    </div> <!--ui segment-->
  </div> <!--ui main container-->
</template>

<script>
import { baseUrl } from '@/assets/config.js';

export default {
  name: 'PostArticle',

  data() {
    return {
      post:{
        text:null,
        category:null,
      }
    };
  },

  computed: {

  },

  methods: {
    async postRequest() {
      // headerを指定する
      const headers = {'Authorization': 'mtiToken'};
      // リクエストボディを指定する
      const requestBody = {
        text: this.post.text,
        category: this.post.category,
        userId:window.localStorage.getItem('userId')
      };
      console.log(requestBody);

      try {
        /* global fetch */
        const res = await fetch(baseUrl + '/article',  {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        
        // 成功時の処理
        console.log(jsonData);
      } catch (e) {
        // エラー時の処理
      }
    }
  },
}
</script>

<style scoped>



</style>
