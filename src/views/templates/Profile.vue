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
        <p class="message">{{message}}</p>
        <form class="ui large form" @submit.prevent="submit()">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" placeholder="ID" required disabled v-model="user.userId" />
            </div>
          </div>
           <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="text" placeholder="Password" v-model="user.password" />
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input type="text" placeholder="Nickname" v-model="user.nickname" />
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="calendar icon"></i>
              <input type="text" placeholder="Age" v-model.number="user.age" />
            </div>
          </div>
          <button :disabled="buttonState" class="button ui fluid huge green" type="submit">更新</button>
        </form>
      </div>
      <button class="button ui huge grey fluid" type="submit" @click="deleteUser" >退会</button>
      <!--<CommonDialog primaryText="aaa" secondaryText="bbb" onClickFunc="() => console.log('aaa')" ></CommonDialog>  />-->
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import {baseUrl} from '@/assets/config.js';
// import {CommonDialog} from '@/components/CommonDialog.vue';

export default {
  name: 'Profile',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      user: {
        userId: window.localStorage.getItem('userId'),
        password: null,
        nickname: null,
        age: null
      },
      message: "",
      token:  window.localStorage.getItem('token'),
      isLoading: false
    };
  },
  
  created: async function() {
    const token = window.localStorage.getItem('token')
    if(!token) {
      this.$router.push({name: 'Login'})
    }
    
    const headers = {'Authorization': this.token};
    
    try {
          /* global fetch */
      this.isLoading = true;
      const res = await fetch(baseUrl + `/user?userId=${this.user.userId}`,  {
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
     this.user.nickname = jsonData.nickname;
     this.user.age = jsonData.age;
      
    } catch (e) {
      // エラー時の処理
      this.isLoading = false;
      console.log("e: ", e);
    }
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    buttonState() {
        const {userId, password, nickname, age} = this.user;
        return !userId || !password || !nickname || !age;
    }
    
  },
  

  methods: {
    // Vue.jsで使う関数はここで記述する
    async submit() {
      this.message = "";
      const headers = {'Authorization': this.token};
      
      const {userId, password, nickname, age} = this.user;
      
      const requestBody = {
        userId,
        password,
        nickname,
        age
      };
  
      try {
        /* global fetch */
        this.isLoading = true;
        const res = await fetch(baseUrl + '/user',  {
          method: 'PUT',
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
        this.isLoading = false;
        this.message = "更新に成功しました。";
       
        console.log(jsonData);
      } catch (e) {
        // エラー時の処理
        this.isLoading = false;
        this.message = e;
        console.log("e: ", e)
      }
    },
    
    async deleteUser() {
      const headers = {'Authorization': this.token};
      
     
      try {
        /* global fetch */
        this.isLoading = true;
        const res = await fetch(baseUrl + `/user?userId=${this.user.userId}`,  {
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
        
        // 成功時の処理
       this.isLoading = false;
       this.$router.push({name: 'Login'})
        console.log(jsonData);
      } catch (e) {
        // エラー時の処理
        this.isLoading = false;
        this.message = e;
        console.log("e: ", e)
      }
    },
  },
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
</style>
