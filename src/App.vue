<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="primary" class="shadow nav_head">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/" class="ml-5">网上书店</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{name:'outer',params:{name:'about'}}">关于</b-nav-item>
          <b-nav-item :to="{name:'outer',params:{name:'FAQ'}}">Q&A</b-nav-item>
          <b-nav-item :to="{name:'outer',params:{name:'contact'}}">联系我们</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form >
            <b-input-group size="sm" >
                <b-form-input size="sm" v-model="input" type="text" placeholder="搜索图书"/>
              <b-input-group-append>
                <b-btn variant="success" @click="emitSearch">查找</b-btn>
              </b-input-group-append>
            </b-input-group>     
          </b-nav-form>
          <b-button size="sm" class="mx-1" to="/signIn" v-if="!ifLogin">登陆</b-button>
          <b-button size="sm" class="mx-1" to="/signUp" v-if="!ifLogin">注册</b-button>
          <b-button size="sm" class="mx-1" @click="logout" v-if="ifLogin">登出</b-button>
          <b-button size="sm" class="mx-1" @click="publishBook" v-if="ifLogin" >发布书籍</b-button>
          <b-button variant="danger" size="sm" class="mx-1" right v-if="ifLogin">{{username}}</b-button>
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
    <div class="footer"/>
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
    username(){
      return Cookies.get('user');
    },
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
    },
    logout(){
      Cookies.remove('user');
      location.replace('/');
    },
    publishBook(){
      this.$router.push({name:"publishBook"})
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
  min-height: 90vh;
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
.footer{
  margin: 3rem auto 0 auto;
  height: 1rem; 
  background-color: #eee;
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
