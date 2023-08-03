<template>
 <div class="search-article">
    <div class="input-area">
       <label class="label" for="userId">ユーザーID</label> 
       <input v-model="inputUserId" id="userId" class="input" placeholder="ユーザーID" />
    </div>
    <div class="input-area">
       <label class="label" for="category">カテゴリー名</label> 
       <input v-model="inputCategory" id="category" class="input" placeholder="カテゴリ" />
    </div>
    <div class="input-area">
       <label class="label" for="category">登録日時</label> 
       <div class="input-date-area">
           <input :v-model="inputDateStart" @change="handleDateStartChange" class="input-date" type="date" name="" id="" value="" />
           <span>から</span>
           <input :v-model="inputDateEnd" @change="handleDateEndChange" class="input-date" type="date" name="" id="" value="" />
           <span>まで</span>
       </div>
    </div>
    <div class="button-area">
        <button class="positive ui button" type="submit" @click.prepend="searchFunc">検索</button>
    </div>
 </div>
</template>

<script>
import { baseUrl } from '@/assets/config.js';
export default {
  name: 'SearchArticle',
  computed: {
  },
  props: {
      searchFunc: {
          type: Function,
          require: true
      }
  },
  data() {
      return {
          inputUserId: "",
          inputCategory: "",
          inputDateStart: "",
          inputDateEnd: "",
      }
  },
  methods: {
      search() {
          console.log("userId: ", this.inputUserId);
          console.log("inputCategory: ", this.inputCategory);
          console.log("inputDateStart: ", this.inputDateStart);
          console.log("inputDateEnd: ", this.inputDateEnd);
      },
      handleDateStartChange(event) {
          const inputValue = event.target.value;
          const selectedDate = new Date(inputValue);
          const dateNumber = selectedDate.getTime();
          this.inputDateStart = dateNumber;
      },
      handleDateEndChange(event) {
          const inputValue = event.target.value;
          const selectedDate = new Date(inputValue);
          const dateNumber = selectedDate.getTime();
          this.inputDateEnd = dateNumber;
      },
      
  }
};
</script>

<style scoped >
    .search-article {
        width: 85%;
        max-width: 560px;
        margin: 0 auto;
        background-color: white;
        padding: 1.4rem 1.2rem;
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
    }
    .input-area {
        display: flex;
        flex-direction: column;
        row-gap: .5rem;
        align-items: flex-starts;
    }
    .input {
        width: 100%;
        border-radius: 5px;
        outline: none;
        border: 1px solid #ccc;
        padding: .5rem .6rem;
        font-size: .9rem;
    }
    .label {
        font-weight: bold;
        font-size: 1.1rem;
        margin-left: .2rem;
    }
    .input-date {
        width: 35%;
        border-radius: 5px;
        outline: none;
        border: 1px solid #ccc;
        padding: .5rem .6rem;
        font-size: .9rem;
        cursor: pointer;
    }
    .input-date-area {
        display: flex;
        align-items: center;
        column-gap: .3rem;
        flex-wrap: wrap;
    }
    .button-area {
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
        /*margin-right: 1rem;*/
    }
</style>