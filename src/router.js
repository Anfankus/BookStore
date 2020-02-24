import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Book from './views/BooksInfo.vue'
import Outer from './views/OuterPage.vue'
import PublishBook from './views/PublishBook.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/signin',
      name:'signIn',
      component:()=>import('./views/SignIn.vue')
    },{
      path:'/signup',
      name:'signUp',
      component:()=>import('./views/SignUp.vue')
    },{
      path:'/book/:id',
      name:'book',
      props:true,
      component:Book
    },{
      path:'/:name',
      name:'outer',
      props:true,
      component:Outer
    },
    {
      path:'/publish',
      name:'publishBook',
      component:PublishBook
    }
  ]
})
