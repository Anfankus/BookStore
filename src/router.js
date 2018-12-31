import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import Book from './views/BooksInfo.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path:'/signin',
      name:'signIn',
      component:SignIn
    },{
      path:'/signup',
      name:'signUp',
      component:SignUp
    },{
      path:'/book/:id',
      name:'book',
      props:true,
      component:Book
    }
  ]
})
