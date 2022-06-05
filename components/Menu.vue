<template>
  <div>
    <header
      class="main_menu home_menu"
      :class="scroll || home == false ? 'menu-blur' : ''"
    >
      <div class="container-fluid">
        <div class="row align-items-center justify-content-center">
          <div class="col-lg-11">
            <nav class="navbar navbar-expand-lg navbar-light">
              <a class="navbar-brand text-logo-menu" to="/index">
                Motortect
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="menu_icon"><i class="fas fa-bars"></i></span>
              </button>
              <div
                class="collapse navbar-collapse main-menu-item"
                id="navbarSupportedContent"
              >
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <NuxtLink to="/" class="nav-link" :class="colorText">
                      Inicio
                    </NuxtLink>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle cursor"
                      :class="colorText"
                      id="navbarDropdown_1"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Cliente
                    </a>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="navbarDropdown_1"
                    >
                      <a
                        class="dropdown-item cursor text-white"
                        @click="formLogin2(true)"
                      >
                        Iniciar sesion</a
                      >
                      <a
                        class="dropdown-item cursor text-white"
                        @click="formLogin2(false)"
                        >Registrate</a
                      >
                    </div>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      :class="colorText"
                      href="blog.html"
                      id="navbarDropdown_3"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      productos
                    </a>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="navbarDropdown_2"
                    >
                      <a class="dropdown-item" href="login.html">
                        mis me gusta
                      </a>
                      <a class="dropdown-item" href="tracking.html"
                        >historial</a
                      >
                      <NuxtLink to="/search" class="dropdown-item">
                        todos
                      </NuxtLink>
                    </div>
                  </li>
                  <li class="nav-item">
                    <NuxtLink to="/cart" class="nav-link" :class="colorText">
                      compra
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <div class="hearer_icon d-flex">
                <div class="dropdown cart">
                  <a class="dropdown-toggle cursor" @click="showBolso()">
                    <!-- <i class="fas fa-shopping-bag"></i>{{ cantidad }} -->
                    <i class="fas fa-shopping-bag" :class="colorText"></i>
                    <!-- <b-badge variant="primary">{{ cantidad }}</b-badge> -->
                  </a>
                </div>
                <a
                  id="search_1"
                  class="cursor"
                  @click="formSearch = !formSearch"
                  ><i class="fas fa-search" :class="colorText"></i
                ></a>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="search_input" style="border:1px solid white" id="search_input_box" v-if="formSearch">
          <div class="container">
            <form
              class="d-flex justify-content-between search-inner"
              @submit.prevent="search()"
            >
              <input
                type="text"
                class="form-control"
                id="search_input"
                placeholder="Buscar"
                autocomplete="off"
                v-model="busqueda"
              />
              <button type="submit" class="btn"></button>
              <span
                class="ti-close"
                id="close_search"
                title="Close Search"
                @click="formSearch = false"
                ><i class="fas fa-times"></i
              ></span>
            </form>
          </div>
        </div>
      </transition>
    </header>
    <div>
      <!-- ************** BOLSO ************ -->
      <b-sidebar
        v-model="modalBolso"
        backdrop
        shadow
        header-class="p-0 bg-system"
        body-class="overflox-x-hidden bg-system"
      >
        <template #header>
          <div class="bg-secondary w-100 mb-2">
            <b-row>
              <b-col cols="10">
                <p class="text-bold" style="font-size: 14px; margin: 5px">
                  CARRITO
                </p>
              </b-col>
              <b-col cols="2">
                <i
                  class="fas fa-times-circle cursor"
                  @click="modalBolso = false"
                ></i>
              </b-col>
            </b-row>
          </div>
        </template>
        <div>
          <div class="bg-secondary cart-sidebar border-top">
            <div
              v-for="(item, index) in cart"
              :key="index"
              class="border-bottom"
            >
              <div class="row my-2">
                <div class="col-lg-3 bg-white flex-center">
                  <b-img
                    :src="item.img"
                    style="object-fit: contain;"
                    :alt="item.descripcion"
                  />
                </div>
                <div class="col-lg-9">
                  <p style="font-size: 12px; line-height: 1.5">
                    {{ item.descripcion }} <br />
                    {{ `S/.${item.precio}` }}
                  </p>
                  <b-form-spinbutton
                    style="margin-top: -6px"
                    id="sb-inline"
                    v-model="item.cantidad"
                    inline
                  ></b-form-spinbutton>
                </div>
              </div>
            </div>
          </div>
          <div class="container text-center my-2 bg-secondary p-2">
            <NuxtLink to="/cart" class="btn btn-primary"
              ><i class="fa fa-credit-card"></i> IR A PAGAR S/.
              {{ subTotal.toFixed(2) }}</NuxtLink
            >
          </div>
          <div class="container text-center my-2 bg-secondary p-2">
            <b-button
              variant="light"
              @click="vaciarCarrito()"
              class="text-bold"
              style="font-size: 12px"
            >
              <i class="fa fa-trash"></i> <b-icon icon="trash"></b-icon> VACIAR
              CARRITO</b-button
            >
          </div>
        </div>
      </b-sidebar>
      <!-- ***************** LOGIN ****************** -->
      <b-sidebar v-model="formUser" backdrop right shadow>
        <Login @click="formLogin()" v-if="login" />
        <Registrar @click="formLogin()" v-else />
      </b-sidebar>
    </div>
    <transition name="fade">
      <div class="ir-arriba" v-show="scroll" @click="scrollTop()">
        <i class="fas fa-chevron-up"></i>
      </div>
    </transition>
  </div>
</template>
<script>
import Registrar from "./Registrar.vue";
import axios from "axios";
import FunctionG from "./Function";
import Swal from "sweetalert2/dist/sweetalert2.js";
export default {
  mixins: [FunctionG],
  props: ["home"],
  data() {
    return {
      formSearch: false,
      modalBolso: false,
      formUser: false,
      login: true,
      cart: [],
      busqueda: null,
      img: "https://siempreauto.com/wp-content/uploads/sites/9/2021/08/damper-2118130_1280.jpg?quality=60&strip=all&w=1200",
      cantidad: 0,
      scroll: false,
      url: "http://127.0.0.1:8000",
    };
  },
  created() {
    this.cantidadCart();
    this.$nuxt.$on("count-cantidad", this.cantidadCart);
    axios.post(this.url + "/api/auth/is-logout").then((res) => {
      console.log(res.data);
    });
  },
  methods: {
    isLogout() {
      if (process.client) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart === null) {
          this.cart = [];
        } else {
          this.cart = cart;
        }
      }
    },
    formLogin() {
      this.login = !this.login;
    },
    formLogin2(boolean) {
      this.formUser = true;
      this.login = boolean;
    },
    getCart() {
      if (process.client) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart === null) {
          this.cart = [];
        } else {
          this.cart = cart;
        }
      }
    },
    createClass(name, rules) {
      if (process.client) {
        var style = document.createElement("style");
        style.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(style);
        if (!(style.sheet || {}).insertRule)
          (style.styleSheet || style.sheet).addRule(name, rules);
        else style.sheet.insertRule(name + "{" + rules + "}", 0);
      }
    },
    showBolso() {
      this.getCart();
      if (this.cart.length > 0) {
        this.modalBolso = true;
      } else {
        this.$bvToast.toast("no hay products agregados", {
          title: "Bolsa vacia",
          variant: "warning",
          solid: true,
        });
      }
    },
    search() {
      this.$router.push("/search/" + this.busqueda);
    },
    cantidadCart() {
      this.getCart();
      this.cantidad = this.countCart;
      let styles =
        'position: absolute;border-radius: 50%;background-color: #2f7dfc;width: 15px;height: 15px;right: -8px;top: -8px;content: "' +
        this.cantidad +
        '";text-align: center;line-height: 15px;font-size: 10px;color: #fff;';
      this.createClass(".main_menu .cart i:after", styles);
    },
    scrollTop() {
      this.intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.intervalId);
        }
        window.scroll(0, window.pageYOffset - 10);
      }, 1);
    },
    scrollListener: function (e) {
      this.scroll = window.scrollY > 500;
    },
    vaciarCarrito() {
      Swal.fire({
        title: "¿estas seguro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "vaciar",
        cancelButtonText: "cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
  },
  mounted: function () {
    window.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy: function () {
    window.removeEventListener("scroll", this.scrollListener);
  },
  computed: {
    subTotal() {
      return this.cart.reduce((total, item) => {
        return total + item.precio * item.cantidad;
      }, 0);
    },
    countCart() {
      return this.cart.reduce((cantidad, item) => {
        return parseInt(cantidad) + parseInt(item.cantidad);
      }, 0);
    },
    colorText() {
      return this.scroll || this.home == false ? "text-white" : "text-white";
    },
  },
};
</script>