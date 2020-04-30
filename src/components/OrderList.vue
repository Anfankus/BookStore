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
          <template v-slot:cell(quantity)="data">
              {{data.value}}
          </template>
          <template v-slot:cell(total)="data">
              {{data.item.price*data.item.quantity}}
          </template>
          <template v-slot:cell(orderState)>
              {{Math.round(Math.random())===0?'已发货':'等待发货'}}
            </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
    created(){
        this.$eventHub.$on('updateOrder',this.onUpdateOrder);
    },
    data(){
        return{
            fields:[
                {key:'index',label:'订单编号'},
                {key:'bookname',label:'书名'},
                {key:'bookid',label:'书籍编号'},
                {key:'price',label:'单价',sortable:true},
                {key:'quantity',label:'数量',sortable:true},
                {key:'total',label:'总价'},
                {key:'orderState',label:'订单状态'}
            ],
            items:[]
        }
    },

    methods:{
        onUpdateOrder(data){
            this.items.push(...data)
        }
    }
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

