import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[],
    checkOutStatus:null
  },
  mutations: {
    pushProductToCart (state, { id }) {
      state.items.push({id,quantity: 1})
    },
    incrementItemQuantity (state, { id }) {
      const cartItem = state.items.find(item => item.id === id)
      cartItem.quantity++
    },
    setCheckoutStatus(state,status){
      state.checkOutStatus=status;
    },
    setCartItems(state,{items}){
      state.items=items;
    }
  },
  actions: {
    checkout ({ commit, state }, products) {
      const savedCartItems = [...state.items]
      commit('setCheckoutStatus', null)
      commit('setCartItems', { items: [] })

      commit('setCartItems', { items: savedCartItems })
      //购物
    }
  }
})
