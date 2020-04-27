<template>
<b-container class="bookContainer mt-5 shadow">
  <b-row >
    <b-col >
      <b-row class="header text-light py-2">
        <b-col col>
          <div>新增图书</div>
        </b-col>
      </b-row>
      <b-row class="content py-3">
        <b-col cols="5">
          <b-img src="//picsum.photos/400/450/?image=15" fluid alt="Responsive image"/>
        </b-col>
        <b-col col align-self="center">
          <b-row class="my-1 form-item">
            <b-col sm="2">
                <label for="input-bookname" style="line-height:40px">书籍名称</label>
            </b-col>
            <b-col sm="10">
                <b-form-input id="input-bookname" placeholder="输入书籍名称" v-model="form.bookname"></b-form-input>
            </b-col>
          </b-row>
            <b-row class="my-1">
                <b-col sm="2">
                <label for="input-author" style="line-height:40px">作者</label>
                </b-col>
                <b-col sm="10">
                <b-form-input id="input-author"  placeholder="输入作者" v-model="form.author"></b-form-input>
                </b-col>
          </b-row>
            <b-row class="my-1">
                <b-col sm="2">
                <label for="input-price" style="line-height:40px">单价</label>
                </b-col>
                <b-col sm="10">
                <b-form-input id="input-price" placeholder="输入单价" v-model="form.price" type="number"></b-form-input>
                </b-col>
          </b-row>
            <b-row class="my-1">
                <b-col sm="2">
                <label for="input-quantity" style="line-height:40px">数量</label>
                </b-col>
                <b-col sm="10">
                <b-form-input id="input-quantity" placeholder="输入库存数量" v-model="form.quantity" type="number"></b-form-input>
                </b-col>
          </b-row>
            <b-row class="my-1">
                <b-col sm="2">
                <label for="input-类别" style="line-height:40px">类别</label>
                </b-col>
                <b-col sm="10">
                <b-form-select id="input-price"  placeholder="输入单价" v-model="form.classid" :options="classOption"></b-form-select>
                </b-col>
          </b-row>
          <b-row class="mt-2">
              <b-col>
               <b-alert style="height:2rem" :variant="result.result?'success':'danger'" :show="ret">
                  <p style="position:relative;top:-0.3rem;font-size:0.8rem">
                    发布{{result.result?'成功':'失败'}}:
                    <b>{{result.msg}}</b>
                  </p>
                </b-alert>
              </b-col>
          </b-row>
          <b-row >
              <b-col offset="7" cols="5">
              <b-btn block variant="outline-success" @click="publish">发布书籍</b-btn>
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
import cookies from 'js-cookie'
export default {
  data(){
    return{
      form:{
        bookname:null,
        author:null,
        price:null,
        quantity:null,
        classid:null,
      },
      classOption:[
        {value:null,text:"请选择书籍类别"},
        {value:1 ,text: '文学'},
        {value:2 ,text: '历史'},
        {value:3 ,text: '哲学'},
        {value:4 ,text: '心理学'},
        {value:5 ,text: '亲子'},
        {value:6 ,text: '计算机'},
        {value:7 ,text: '艺术'},
        {value:8 ,text: '外语'},
        {value:9 ,text: '医学'},
        {value:10 ,text: '传记'},
      ],
      ret:false,
      result:{
          result:null,
          msg:""
      }
    }
  },
  methods:{
      async publish(){
          console.log(this.form);
          await axios.post("/publish-book",{
              ...this.form,
              username:cookies.get('user')
          }).then(({data})=>{
              this.ret=true;
              this.result.result=true;
              console.log(data)
              setTimeout(() => {
                  this.$router.push({name:"home"})
              }, 2000);
          }).catch(err=>{
              console.log(err)
              this.ret = true;
              this.result ={
                  result:false,
                  msg:"服务器错误"
              }
          })
      }
  },
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

.form-item{
    label{
        text-align: left;
    }
}
</style>
