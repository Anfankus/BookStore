<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="primary" class="shadow">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/" class="ml-5">网上书店</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#">关于</b-nav-item>
          <b-nav-item href="#">Q&A</b-nav-item>
          <b-nav-item href="#">联系我们</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="搜索图书"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">搜索</b-button>
          </b-nav-form>
          <b-button size="sm" class="ml-1 mr-1" to="/signIn" v-show="!ifLogin">登陆</b-button>
          <b-button size="sm" to="/signUp" v-show="!ifLogin">注册</b-button>
          <b-nav-item-dropdown right v-show="ifLogin">
            <template slot="button-content">我的</template>
            <b-dropdown-item href="#">个人信息</b-dropdown-item>
            <b-dropdown-item href="#">购物车</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data(){
    return{
    }
  },
  computed:{
    ifLogin(){
      if(Cookies.get('user')){
        return true;
      }
      else{
        return false;
      }
    }
  }
}
</script>


<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.wrapper{
  margin: 1.5rem;
}
</style>
