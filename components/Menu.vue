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
                <!-- <img
                  src="data:image/webp;base64,UklGRngBAABXRUJQVlA4TGwBAAAvUQAFEH8gFkymnf+RwqCM/0QkdBzIrbXtbZuXOZPoJRnawKidQy+idvYE5AaKfVrAaQByA6JzpTQB3bkEmDMfB8QNIvo/AQptrA6U4JaMDDrSBYdtbpNYkpPNreTwPFyXZpQZRR1BSh4NY3WQxJiyHMhpRFWhYxhQ1y8oakoxIQdTI6hqTu4FPS14veSR7oCe1F7zRvLYWbSO+KgZmFqR8luBm/azNkBFHte0bA61/MJzbV35/V/2uwf4Ig9oWXS0/bg+3KcT8EEz6urSlBbsWGsyHrcZadu3MOcdm8OAghwe+hi4KY0oepiSlnymOnHbPA/Iq0vTx+aL5FHxaEiacUZxwA/MGNr41vwm/CTn8JtqYgOWpI5YUEzMgVvZQC6GT5zrf78jOJcBpGMwcNNSNuATHEprXEW44FBa8F5XXwIseC7N6URpQ1/3/F/w05a6NOEwirGhr/01cK6AJWVpQDOKruhJn5YcZvwA"
                  alt="logo"
                /> -->
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
                    <NuxtLink to="/" class="nav-link"> Inicio </NuxtLink>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle cursor"
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
                    <NuxtLink to="/cart" class="nav-link"> compra </NuxtLink>
                  </li>
                </ul>
              </div>
              <div class="hearer_icon d-flex">
                <div class="dropdown cart">
                  <a class="dropdown-toggle cursor" @click="showBolso()">
                    <!-- <i class="fas fa-shopping-bag"></i>{{ cantidad }} -->
                    <i class="fas fa-shopping-bag"></i>
                    <!-- <b-badge variant="primary">{{ cantidad }}</b-badge> -->
                  </a>
                </div>
                <a
                  id="search_1"
                  class="cursor"
                  @click="formSearch = !formSearch"
                  ><i class="fas fa-search"></i
                ></a>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="search_input" id="search_input_box" v-if="formSearch">
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
      <b-sidebar v-model="modalBolso" backdrop shadow>
        <div>
          <div>
            <b-list-group v-for="(item, index) in cart" :key="index">
              <b-list-group-item
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  border-0
                  bg-transparent
                "
              >
                <img :src="item.img" width="40px" alt="" />
                {{ item.descripcion }}
                <b-badge variant="primary" pill> {{ item.cantidad }}</b-badge>
              </b-list-group-item>
            </b-list-group>
          </div>
          <div class="container text-center">
            <div class="alert border-top border-bottom">
              SUB TOTAL: S/. {{ subTotal.toFixed(2) }}
            </div>
          </div>
          <div class="container text-center">
            <NuxtLink to="/cart" class="btn btn-primary rounded-0"
              ><i class="fas fa-info-circle"></i> Mas detalles</NuxtLink
            >
            <b-button squared variant="primary"
              ><i class="fas fa-angle-double-right"></i> Continuar</b-button
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
import FunctionG from './Function';
export default {
  mixins:[FunctionG],
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
      url:'http://127.0.0.1:8000'
    };
  },
  created() {
    this.cantidadCart();
    this.$nuxt.$on("count-cantidad", this.cantidadCart);
    axios.post(this.url + '/api/auth/is-logout').then(res=>{
       console.log(res.data);
    });
  },
  methods: {
    isLogout(){
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
  },
};
</script>