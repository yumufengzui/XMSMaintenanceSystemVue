export default {
  namespaced: true,
  state: {
    hotelid: ''
  },
  getters: {},
  mutations: {
    changeHotelId(state, id) {
      state.hotelid = id;
    },
  },
  actions: {},
}