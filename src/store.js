/* eslint-disable no-debugger */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import cookie from 'js-cookie';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[],
    checkOutStatus:null,
    msg:null
  },
  getters:{
    cartTotal(state){
      return state.items.reduce((total,{price,quantity})=>{
        return total+price*quantity;
      },0)
    }
  },
  mutations: {
    pushProductToCart (state, { bookid , bookname, price , quantity}) {
      let inner=state.items.find(item=>item.bookid === bookid);
      if(inner){
        inner.quantity+=quantity;
      }
      else 
        state.items.push({bookid,bookname,price,quantity})
    },
    incrementItemQuantity (state,  bookid ) {
      const cartItem = state.items.find(item => item.bookid === bookid)
      cartItem.quantity++
    },
    decrementItemQuantity (state,  bookid ) {
      const cartItem = state.items.find(item => item.bookid === bookid)
      if(cartItem.quantity>0){
        cartItem.quantity--
      }
    },
    setCheckoutStatus(state,status){
      state.checkOutStatus=status;
    },
    setMsg(state,msg){
      state.msg=msg;
      setTimeout(()=>state.msg=null,5000);
    },
    setCartItems(state,{items}){
      state.items=items;
    }
  },
  actions: {
    async checkout ({ commit, state , getters}) {
      const user=cookie.get('user')
      if(!user){
        return;
      }
      const savedCartItems = [...state.items];
      const total=getters.cartTotal;
      commit('setCheckoutStatus', null);
      commit('setMsg',null);
      commit('setCartItems', { items: [] });

      // let ret =await axios.post('/checkout',{
      //   username:user,
      //   order:savedCartItems.map(each=>{return{bookid:each.bookid,quantity:each.quantity}}),
      //   total
      // }).catch(()=>false);
      // if(!ret){
      //   commit('setCartItems', { items: savedCartItems });
      //   commit('setCheckoutStatus',false);
      //   commit('setMsg','连接服务器错误');
      //   return;
      // }else if(!ret.data.result){
      //   commit('setCartItems', { items: savedCartItems });
      //   commit('setCheckoutStatus',false);
      //   commit('setMsg',ret.data.msg);
      // }else{
        commit('setCheckoutStatus',true);
        commit('setMsg','成功');
      // }
    }
  }
})
