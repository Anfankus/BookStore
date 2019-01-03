<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="primary" class="shadow nav_head">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/" class="ml-5">网上书店</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#">关于</b-nav-item>
          <b-nav-item href="#">Q&A</b-nav-item>
          <b-nav-item href="#">联系我们</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form >
            <b-form-input size="sm" class="mr-sm-2" v-model="input" type="text" placeholder="搜索图书"/>
            <b-button size="sm" class="my-2 my-sm-0" @click="emitSearch">搜索</b-button>
          </b-nav-form>
          <b-button size="sm" class="mx-1" to="/signIn" v-if="!ifLogin">登陆</b-button>
          <b-button size="sm" class="mx-1" to="/signUp" v-if="!ifLogin">注册</b-button>
          <b-dd size="sm" class="mx-1" right v-if="ifLogin&&false">
            <template slot="button-content">我的</template>
            <b-dropdown-item href="#">个人信息</b-dropdown-item>
            <b-dropdown-item href="#">购物车</b-dropdown-item>
          </b-dd>
          <b-btn size="sm"
          class="ml-1 mr-1" 
          @click="showCart=!showCart" 
          variant="warning text-white">
          购物车
            <b-badge variant="light">{{$store.state.items.length}}</b-badge>
          </b-btn>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <transition  name="slide-fade">
      <cart v-show="showCart" class="cart shadow"/>
    </transition>
    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Cart from '@/components/Cart'
export default {
  data(){
    return{
      showCart:false,
      input:null
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
  },
  methods:{
    emitSearch(){
      if(!this.input)
        return;
      this.$eventHub.$emit('search',{
        type:'bookname',
        input:this.input
      })
    }
  },
  components:{
    cart:Cart
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
  min-width: 512px;
  min-height: 100vh;
}
.nav_head{
  height:4rem;
  position: fixed!important;
  width: 100%;
  z-index: 3;
}
.wrapper{
  padding-top: 4rem!important;
}
.cart{
  position: fixed;
  z-index: 3;
  right:  0;
  top:5rem;
  width:40rem!important;
  border:white solid;
  border-radius: 8px!important;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>
