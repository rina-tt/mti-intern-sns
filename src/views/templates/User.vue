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
        <form action="" class="ui form">
          <div class="field">
            <label for="nickname">ユーザー名</label>
            <input v-model="nickname" type="text" name="nickname" id="nickname" placeholder="Nickname"  />
          </div>
          
          <div class="field">
            <label>年齢</label>
            <div class="inline fields">
              <div class="field">
                <input v-model.number="start" type="text" name="agestart" />
                <label for="agestart">歳から</label>
              </div>
              
              <div class="field">
                <input v-model.number="end" type="text" name="ageend" />
                <label for="ageend">歳まで</label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ul class="ui three column grid">
        <template v-for="({userId, nickname, age}, index) in filteredUsers" :key="index">
          <li class="column">
            <div class="ui card fluid">
              <div class="content">
                <h2 class="header">
                  {{nickname}}
                  <span class="ui green label">{{age}}</span>
                </h2>
                <span class="meta">{{userId}}</span>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';

export default {
  name: 'Template',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      token: window.localStorage.getItem("token"),
      users: [],
      nickname: "",
      start: 0,
      end: 100,
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
      const res = await fetch(baseUrl + `/users`,  {
        method: 'GET',
        headers
      });

      const text = await res.text();
      const jsonData = text ? JSON.parse(text) : {}
      this.users = jsonData;

      // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
      if (!res.ok) {
        const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
        throw new Error(errorMessage);
      }
      this.isLoading = false;
      
    // this.users = JSON.parse(jsonData);
      console.log("jsonData: ", this.users[0].age);
      
    } catch (e) {
      this.isLoading = false;
      // エラー時の処理
      console.log("e: ", e)
    }
  },


  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    
    filteredUsers() {
      return this.users.filter(({nickname, age}) => {
       return nickname?.match(this.nickname) && age >= this.start && age <= this.end
      })
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
  },
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
</style>
