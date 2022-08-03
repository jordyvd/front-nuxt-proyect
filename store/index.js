import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      cart: [],
      urlImg: process.env.BASE_URL + "/images/productos/",
      cantidad: 0,
      userLog: null
    }),
    mutations: {
      getCart(state) {
        state.cart = [];
        state.cantidad = 0;
        if (process.client) {
          let cart = JSON.parse(localStorage.getItem("cart"));
          if (cart === null) {
            state.cart = [];
          } else {
            state.cart = cart;
            state.cart.forEach(element => {
              state.cantidad += element.cantidad;
            });
          }
        }
      },
      pushCart(state, item) {
        state.cart.push({
          id: item.id,
          descripcion: item.descripcion,
          precio: item.precio_venta,
          marca: item.marca,
          img: state.urlImg + item.url,
          cantidad: item.cantidad,
        });
        state.cantidad += item.cantidad;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      },
      updateCantidad(state, item) {
        state.cart.forEach((element, index) => {
          if (element.id == item.id) {
            state.cart[index].cantidad = item.cantidad;
          }
        });
        localStorage.setItem("cart", JSON.stringify(state.cart));
      },
      userLogNuevo(state, item) {
        state.userLog = item;
        localStorage.setItem("user", JSON.stringify(item));
      },
      setUserLocalStorage(state) {
        if (process.client) {
          let user = JSON.parse(localStorage.getItem("user"));
          if (user == null) {
            state.user = null;
          } else {
            state.user = user;
          }
        }
      },
      clearCart(state){
        state.cart = [];
        state.cantidad = 0;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    }
  })
}

export default createStore