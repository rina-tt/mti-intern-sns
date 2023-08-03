<template>
  <div id="app">
    <Menu v-if="!isLoginPage" />
    <router-view/>
  </div>
</template>

<script>
  import {RouterView} from 'vue-router'
  import Menu from '@/components/Menu.vue';
  
  export default {
    name: 'App',
    components: {
      Menu
    },
    computed: {
      isLoginPage() {
        return this.$route.path === '/Login' ;
      }
    }
    
  }
</script>
