<template>
  <div>
    <div class='head text-white'>
      <div id='curtain'/>
      <div id="top">
        <h1 >寻找你的书</h1>
        <h4>超过30000本书收录在内</h4>
      </div>
      <div id="form">
        <b-input-group size="lg" >
          <b-form-input v-model="input"/>
          <b-input-group-append>
            <b-dd :text="list[type]" variant="primary">
              <b-dd-item v-for="(value,key) in list" :key="key" @click="type=key">
                {{value}}
              </b-dd-item>
            </b-dd>
            <b-btn variant="success" @click="search">查找</b-btn>
          </b-input-group-append>
        </b-input-group>
      </div>
      <div id='bottom'>
        <b>热门搜索:
          <b-link to="/book/2">浮生六记</b-link>
          <b-link to="/book/8">西游记 </b-link>
          <b-link to="/book/12">史记</b-link>
        </b>
        <br/>
        <b>标签搜索:
          <span 
          style="cursor:pointer"
          class="text-warning"
          v-for="each in bookClass"
          :key="each"
          @click="search({type:'classname',input:each})">{{each}} </span>
        </b>
      </div>
    </div>
    <b-container id="results" class="mt-3">
      <b-row class="">
        <b-col col offset=1>
          <h4 class="text-left">{{list[searchType]}}是<b>{{searchInput}}</b>的搜索结果</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-table :items="datas.books" :fields="fields">
          <template v-slot:cell(index)="data">
            {{data.index+1}}
          </template>
          <template v-slot:cell(bookname)="data">
            <b-link :to="{name:'book',params:{id:data.item.bookid}}">{{data.value}}</b-link>
          </template>
        </b-table>
      </b-row>
      <b-row>
        <b-col cols=6 offset="4">
          <b-btn-toolbar>
            <b-button-group class="mx-1">
              <b-btn
              @click="jumpTo(1)">&laquo;</b-btn>
              <b-btn
              :class="{disabled:datas.page<=1}" 
              @click="jumpTo(datas.page-1)">&lsaquo;</b-btn>
            </b-button-group>              
            <b-button-group class="mx-1">
              <b-btn 
              v-for="(each,index) in pages" 
              :key="index"
              :class="{disabled:datas.page==index+1}"
              @click="jumpTo(index+1)">
              {{index+1}}
              </b-btn>
            </b-button-group>
            <b-button-group class="mx-1">
              <b-btn 
              :class="{disabled:datas.page+1>datas.totalPage}" 
              @click="jumpTo(datas.page+1)" 
              variant="outline-secondary">&rsaquo;</b-btn>
              <b-btn
              @click="jumpTo(datas.totalPage)"
              variant="outline-secondary">&raquo;</b-btn>
            </b-button-group>
          </b-btn-toolbar>
        </b-col>
      </b-row>
    </b-container>
  </div>

</template>

<script>
export default {
  data(){
    return{
      searchType:null,
      searchInput:null,
      input:null,
      type:'name',
      list:{
        author:'作者',
        name:'书名',
        id:'编号'
      },
      datas:{
        page:1,
        totalPage:5,
        books:[{
          id:1,
          name:'这是啥',
          author:'张可',
          price:14,
          quantity:1
          }]
        },
      fields:[
        {key:'index',label:'序号'},
        {key:'name',label:'书名'},
        {key:'author',label:'作者'},
        {key:'price',label:'单价'}
      ],
      bookClass:['文学','历史','哲学','心理学','亲子','计算机','艺术','外语','医学','传记']
    }
  },
  computed:{
    pages(){
      return new Array(this.datas.totalPage);
    }
  },
  methods:{
    search(){
    },
    jumpTo(page){
     return page+1;
    }
  }

}
</script>
<style lang="less" scoped>
#curtain{
  z-index: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .32)
}
.head{
  position: relative;
  margin: 50px 0 0 0;
  width:100%;
  background-image: url('../assets/book1.jpg');
  background-size: cover;
  background-position: center;
  &>#top{
    position: inherit;
    &>h1{
      margin: 0 auto 5px;
      padding: 11rem 0 1rem 0;
    }
    &>h4{
      padding-bottom: 2rem;
    }
  }
  &>#form{
    position: inherit;
    margin: 0 auto;
    width:50rem;
    & input:focus{
      border-color: #28a745!important;
      box-shadow: 0 0 0 0.1rem rgba(40,167,69,0.25);
    }
    & button{
      width:7rem;
    }
    @media screen and (max-width:850px) {
      width: 80%;
    }
  }
  &>#bottom{
    position: inherit;
    padding: 2rem 0 7rem 0;
  }
}
</style>

