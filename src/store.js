/* eslint-disable no-debugger */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[{
      id:1,
      name:'这是啥',
      price:14,
      quantity:1
    },{
      id:2,
      name:'这是啥',
      price:15,
      quantity:2
    }],
    checkOutStatus:null
  },
  getters:{
    cartTotal(state){
      return state.items.reduce((total,{price,quantity})=>{
        return total+price*quantity;
      },0)
    }
  },
  mutations: {
    pushProductToCart (state, { id , name}) {
      state.items.push({id,name,quantity: 1})
    },
    incrementItemQuantity (state,  id ) {
      const cartItem = state.items.find(item => item.id === id)
      cartItem.quantity++
    },
    decrementItemQuantity (state,  id ) {
      const cartItem = state.items.find(item => item.id === id)
      if(cartItem.quantity>0){
        cartItem.quantity--
      }
    },
    setCheckoutStatus(state,status){
      state.checkOutStatus=status;
    },
    setCartItems(state,{items}){
      state.items=items;
    }
  },
  actions: {
    async checkout ({ commit, state }) {
      const savedCartItems = [...state.items]
      commit('setCheckoutStatus', null)
      commit('setCartItems', { items: [] })

      commit('setCartItems', { items: savedCartItems })
      //购物
    }
  }
})
