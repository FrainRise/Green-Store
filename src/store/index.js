import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = `https://fakestoreapi.com/products`

export default new Vuex.Store({
  state: {
    products: [],
    productInfo: {},
    recentProducts: [],
    cart: [], 
    order: {},
    search: '',
    filterType: '',
    dialog: false,
    isFilterActive: false,
    isFormSubmitted: false,
  },
  mutations: {
    getAllProducts: (state, payload) => (state.products = payload),
    getRecentProducts: (state, payload) => (state.recentProducts = payload),
    getProductInfo: (state, payload) => (state.productInfo = payload),
    updateSearchQuery:(state, payload) => ( state.search = payload),
    filterByType: (state, type) => (state.filterType = type),
    filterSwitcher: (state, payload) => (state.isFilterActive = payload),
    setInfoDialog: (state, payload) => (state.dialog = payload),
    setOrderDialog: (state, payload) => (state.isFormSubmitted = payload),
    addToCart: (state, payload) => (state.cart.push(payload)),
    clearCart: (state) => (state.cart = []),
    formOrder: (state, payload) => (state.order = payload),
    deleteFromCart: (state, id) => (state.cart.splice(id, 1))
  },
  actions: {
    async fetchAllProducts({ commit }) {
      try {
        let response = await axios.get(`${API_URL}`)
        let data = response.data;
        commit('getAllProducts', data)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchRecentProducts({ commit }) {
      try {
        let response = await axios.get(`${API_URL}?limit=4`)
        let data = response.data
        commit('getRecentProducts', data)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchProductInfo({ commit }, item) {
      try {
        let response = await axios.get(`${API_URL}/${item.id}`)
        let data = response.data
        commit('getProductInfo', data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  getters: {
    SEARCHPRODUCT: state => {
      return state.products.filter(item => {
        return item.title.toLowerCase().includes(state.search.toLowerCase())
      })
    },
    FILTERPRODUCT: state => {
      return state.products.filter(item => {
        return state.filterType === '' ? state.products: item.category === state.filterType;
      })
    } 
  }
})
