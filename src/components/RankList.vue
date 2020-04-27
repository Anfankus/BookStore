<template>
  <b-container>
    <b-row>
      <b-col cols class="cartcontent">
        <b-table :items="items"  :fields="fields" class="mt-2">
          <template v-slot:cell(index)="data">
              {{data.index+1}}
          </template>
          <template v-slot:cell(bookid)="data">
              <b-link :to="{name:'book',params:{id:data.value}}">{{data.value}}</b-link>
          </template>
          <template v-slot:cell(bookname)="data">
              <b-link :to="{name:'book',params:{id:data.item.bookid}}">{{data.value}}</b-link>
          </template>
          <template v-slot:cell(ordernum)="data">
              {{data.value}}
            </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
    data(){
        return{
            fields:[
                {key:'index',label:'排名'},
                {key:'bookname',label:'书名'},
                {key:'bookid',label:'书籍编号'},
                {key:'ordernum',label:'订购本数'}
            ],
            items:[
                {bookname:'第一本书',bookid:1,ordernum:201},
                {bookname:'第二本书',bookid:11,ordernum:200},
                {bookname:'第三本书',bookid:12,ordernum:141},
                {bookname:'第四本书',bookid:13,ordernum:32},
            ]
        }
    },

}
</script>
<style lang="less">
.cartcontent{
    width: 35rem!important;
    background-color: white;
    padding: 15px;
}
.little-btn{
    width: 1.5rem;
    height: 1.5rem;
    padding: 1px!important;
}
</style>

