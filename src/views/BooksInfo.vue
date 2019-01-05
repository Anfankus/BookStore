<template>
<b-container class="bookContainer mt-5 shadow">
  <b-row>
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
            <b-col col>库存状态:</b-col>
            <b-col col :class="getQuantityStatus.class">{{getQuantityStatus.msg}}</b-col>
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
                <b-button class="little-btn" size="sm"  @click="count++">+</b-button>
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
              <b-btn style="width:100%" @click="addToCart" variant="success">添加至购物车</b-btn>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</b-container>
</template>
<script>
import axios from 'axios';
export default {
  props:['id'],
  data(){
    return{
      ready:false,
      book:null,
      count:0
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
      let result=await axios.get('/book',{
        params:{
          bookid:this.id
        }
      });
      if(result.data){
        this.book=result.data;
        this.ready=true;
      }
    },
    addToCart(){
      let {bookid,bookname,price}=this.book;
      let quantity=this.count;
      this.$store.commit('pushProductToCart',{bookid,bookname,price,quantity});
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
