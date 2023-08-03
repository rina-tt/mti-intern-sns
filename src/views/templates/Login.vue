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
              <input  type="text" placeholder="ID" v-model="user.userId"  autofocus/>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="text" placeholder="Password" v-model="user.password" />
            </div>
          </div>
          <div class="field" v-if="!isLogin">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input type="text" placeholder="Nickname" v-model="user.nickname" />
            </div>
          </div>
          <div class="field" v-if="!isLogin">
            <div class="ui left icon input">
              <i class="calendar icon"></i>
              <input type="text" placeholder="Age" v-model.number="user.age" />
            </div>
          </div>
          <button :disabled="buttonState" class="button ui fluid huge green" type="submit">{{submitText}}</button>
        </form>
      </div>
      <button class="button ui huge grey fluid" type="submit" @click="toggleMode()" >{{toggleText}}</button>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';

export default {
  name: 'Login',


  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      isLogin: true,
      user: {
        userId: null,
        password: null,
        nickname: null,
        age: null
      },
      message: "",
      isLoading: false
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    submitText() {
      return this.isLogin ? "ログイン" : "新規登録";
    },
    toggleText() {
      return this.isLogin ? "新規登録" : "ログイン";
    },
    buttonState() {
      if(this.isLogin) {
        const {userId, password,} = this.user;
        console.log("bool: ", userId, password)
        return !userId || !password ;
      }else {
        const {userId, password, nickname, age} = this.user;
        return !userId || !password || !nickname || !age;
      }
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    toggleMode() {
      this.isLogin = !this.isLogin
      this.clearForm()
    },
    clearForm() {
      this.user = {
        userId: null,
        password: null,
        nickname: null,
        age: null
      }
    },
    async submit() {
      if(this.isLogin) {
        console.log("login");
        const requestBody = {
          userId: this.user.userId,
          password:this.user.password
        };

        try {
          /* global fetch */
          this.isLoading = true;
          const res = await fetch(baseUrl + '/user/login',  {
            method: 'POST',
            body: JSON.stringify(requestBody)
          });
  
          const text = await res.text();
          const jsonData = text ? JSON.parse(text) : {}
  
          // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
          if (!res.ok) {
            const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
            throw new Error(errorMessage);
          }
          this.isLoading = false;
          
          window.localStorage.setItem('token', jsonData.token);
          window.localStorage.setItem('userId', this.user.userId);
          
          this.$router.push({name: 'Home'});
          
        } catch (e) {
          // エラー時の処理
        this.message = e;
          this.isLoading = false;
          console.log("e: ", e)
        }
        return;
      }
      
      const requestBody = {
        userId: this.user.userId,
        password:this.user.password,
        nickname: this.user.nickname,
        age: this.user.age
      };

      try {
        /* global fetch */
        this.isLoading = true;
        const res = await fetch(baseUrl + '/user/signup',  {
          method: 'POST',
          body: JSON.stringify(requestBody)
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        this.isLoading = false;
        
        // 成功時の処理
        
        window.localStorage.setItem('token', jsonData.token);
        window.localStorage.setItem('userId', this.user.userId);
          
        this.$router.push({name: 'Home'});
      } catch (e) {
        // エラー時の処理
        this.isLoading = false;
        this.message = e;
        console.log("e: ", e)
      }
    }
  },
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
</style>
