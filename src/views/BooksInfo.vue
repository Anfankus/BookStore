<template>
<b-container class="bookContainer mt-5 shadow">
  <b-row class="border-bottom">
    <b-col v-if="!ready">加载中</b-col>
    <b-col v-else>
      <b-row class="header text-light py-2">
        <b-col col>
          <div>图书信息</div>
        </b-col>
      </b-row>
      <b-row class="content py-3">
        <b-col cols="5">
          <b-img src="//picsum.photos/400/450/?image=15" fluid alt="Responsive image"/>
        </b-col>
        <b-col col>
          <b-row class="text-left py-3 border-bottom mb-3">
            <b-col><h3>{{book.bookname}}</h3></b-col>
          </b-row>
          <b-row id="basis" class="py-3 text-left py-3 border-bottom mb-3">
            <b-col col>作者:</b-col>
            <b-col col>{{book.author}}</b-col>
            <div class="w-100"/>
            <b-col col>类别:</b-col>
            <b-col col>{{book.classname}}</b-col>
            <div class="w-100"/>
            <b-col col>库存数量:</b-col>
            <b-col col :class="getQuantityStatus.class">{{this.book.quantity}}</b-col>
            <div class="w-100"/>
            <b-col col>发布者:</b-col>
            <b-col col>{{book.username}}</b-col>
            <div class="w-100"/>
            <b-col col>价格:</b-col>
            <b-col col class="text-primary">￥{{book.price}}</b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col class="text-left">
              <span>数量:</span>
            </b-col>
            <b-col>
              <b-input-group>
                <b-button class="little-btn" size="sm" :disabled="count<=0" @click="count--">-</b-button>
                <span style="width:2rem">{{count}}</span>
                <b-button class="little-btn" size="sm" :disabled="count>=this.book.quantity"  @click="count++">+</b-button>
              </b-input-group>
            </b-col>
            <div class="w-100 my-1"/>
            <b-col class="text-left">
              <span>总金额:</span>
            </b-col>
            <b-col class="text-left text-primary">
              ￥{{total}}
            </b-col>
          </b-row>
          <b-row class="">
            <b-col cols="6">
              <b-btn v-if="this.book.quantity>0" style="width:100%"  :disabled="count<=0" @click="addToCart" variant="success">添加至购物车</b-btn>
              <b-btn v-else style="width:100%" variant="secondary" disabled>已售罄</b-btn>
           </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
  <div v-if="ready" class="mt-2 ml-3">
    <b-row class="ml-1">
      <h2>评论区</h2>
    </b-row>
    <b-list-group class="w-100">
      <b-list-group-item v-for="(value,key) in comments" :key="key" class="flex-column align-items-start border rounded my-1">
        <div class="d-flex w-100 justify-content-between ">
          <h5 class="mb-1">{{value.username}}</h5>
          <small>{{new Date(value.commentdate).toLocaleDateString()}}</small>
        </div>
        <p class="mb-1 text-left">
          {{value.comment}}
        </p>
      </b-list-group-item>
    </b-list-group>
    <b-row >
        <b-form @submit="onSubmit" class="w-100 mx-3 text-left my-3">
        <b-form-group
          id="input-group-1"
          label="发表评论"
          label-for="input-1"
          description="评论字数在300字以内"
        >
          <b-form-input
            id="msg-1"
            v-model="form.comment"
            required
            placeholder="输入评论"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">提交</b-button>
      </b-form>
    </b-row>
  </div>
</b-container>
</template>
<script>
import axios from 'axios';
import cookies from 'js-cookie'
export default {
  props:['id'],
  data(){
    return{
      ready:false,
      book:null,
      count:0,
      comments:[
        {
          username:"aaabbb",
          commentdate:(new Date).toLocaleString(),
          comment:"这是一条评论"
        },
        {
          username:"aaabbb",
          commentdate:(new Date).toLocaleString(),
          comment:"这是一条评论"
        }
      ],
      form:{
        comment:""
      }
    }
  },
  computed:{
    total(){
      return this.count*this.book.price;
    },
    getQuantityStatus(){
      let className,msg;
      if(!this.ready) return{class:className,msg};
      if(this.book.quantity>30){
        className='text-success';
        msg='五天内送至';
      }else if(this.book.quantity>10){
        className='text-warning';
        msg='十天内送至';
      }else if(this.book.quantity>0){
        className='text-info';
        msg='十五天内送至';
      }else{
        className='text-danger';
        msg='二十天内送至';
      }
      return{class:className,msg};
    }
  },
  methods:{
    async updateInfo(){
      await Promise.all([
        axios.get('/book',{
          params:{
            bookid:this.id
          }
        }).then(data=>data.data),
        axios.get('/comment',{
          params:{bid:this.id}
        }).then(data=>data.data)
      ]).then(([book,comments])=>{
        this.book = book;
        this.comments = comments;
        this.ready = true;
      }).catch(console.log);
    },
    addToCart(){
      let {bookid,bookname,price}=this.book;
      let quantity=this.count;
      this.$store.commit('pushProductToCart',{bookid,bookname,price,quantity});
      this.updateInfo();
    },
    async onSubmit(){
      let username = cookies.get("user");
      if(!username){
        this.$router.push({name:'signIn'})
        return;
      }
      await axios.post("/comment",{
        ...this.form,
        bid:this.id,
        date:(new Date).toLocaleString(),
        username:username
      }).then(({data})=>{
        if(data.result){
          this.form.comment = "";
          this.updateInfo();
        }else{
          alert(data.msg);
        }
      }).catch(console.log);
    }
  },
  mounted(){
    this.updateInfo();
  },
  beforeRouteUpdate (to, from, next) {
    this.ready=false;
    this.updateInfo();
    next();
  }
}
</script>
<style lang="less">
.bookContainer{
  border-radius: 8px;
  .header{
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background-color: #555;
    font-size: 2rem;
  }
  .content{
    background-color: #efefef22;
  }
  #basis{
    font-size: 1.4rem;
  }
}
</style>
