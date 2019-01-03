/* eslint-disable no-debugger */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

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
    },
    setCartItems(state,{items}){
      state.items=items;
    }
  },
  actions: {
    async checkout ({ commit, state , getters}) {
      const savedCartItems = [...state.items];
      const total=getters.cartTotal;
      commit('setCheckoutStatus', null);
      commit('setMsg',null);
      commit('setCartItems', { items: [] });
      let ret =await axios.post('/checkout',{
        order:savedCartItems,
        total
      });
      commit('setCheckoutStatus',true);
      commit('setMsg',ret.msg);
      if(!ret.result){
        commit('setCartItems', { items: savedCartItems });
      }
    }
  }
})
