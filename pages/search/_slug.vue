<template>
  <div>
    <Menu :home="false"/>
     <b-overlay
      :show="loading"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary">
    <section class="cat_product_area section_padding border_top">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <!-- *** spinner *** -->
            <b-col cols="12" class="mt-3" v-if="spinnerMarca">
              <b-skeleton-img no-aspect height="100px"></b-skeleton-img>
            </b-col>
            <!-- *** fin spinner *** -->
            <div class="left_sidebar_area" v-else>
              <aside class="left_widgets p_filter_widgets sidebar_box_shadow">
                <div class="l_w_title">
                  <h3>Marcas encontradas</h3>
                </div>
                <div class="widgets_inner">
                  <ul class="list">
                    <p
                      class="text-marca pointer"
                      v-if="marca != null"
                      @click="resetGet()"
                    >
                      <b-alert show variant="light" class="border"
                        ><i class="fas fa-trash-alt"></i> {{ marca }}</b-alert
                      >
                    </p>
                    <li v-for="(item, index) in marcas" :key="index">
                      <div v-if="item.delete == 0">
                        <a
                          @click.prevent="selectMarca(item)"
                          class="text-marca pointer"
                        >
                          {{ item.marca }}
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </aside>
              <!-- <aside
                class="
                  left_widgets
                  p_filter_widgets
                  price_rangs_aside
                  sidebar_box_shadow
                "
              >
                <div class="l_w_title">
                  <h3>Precio mayor</h3>
                </div>
                <div class="widgets_inner">
                  <div class="range_item">
                    <b-form-input
                      v-model="range"
                      type="range"
                      min="0"
                      max="600"
                    ></b-form-input>
                    <div class="d-flex align-items-center">
                      <div class="price_text">
                        <p>Price : S/.{{ range }}</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="price_text btn-100" @click="filtrarRange()">
                        <button class="btn btn-primary btn-block" small><i class="fas fa-filter"></i> Filtrar</button>
                        <p><i class="fas fa-search-dollar"></i> FILTRAR</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside> -->
            </div>
          </div>
          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-12">
                <div
                  class="
                    product_top_bar
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                >
                  <div class="single_product_menu product_bar_item d-flex">
                    <b-alert show variant="light" class="text-search">{{
                      $route.params.slug
                    }}</b-alert>
                  </div>
                  <div class="product_top_bar_iner product_bar_item d-flex">
                    <div class="product_bar_single">
                      <select class="wide form-control">
                        <option value="" hidden>Ordenar por</option>
                        <option value="1">Precios mas bajos</option>
                        <option value="2">Precios mas altos</option>
                      </select>
                    </div>
                    <!-- <div class="product_bar_single">
                      <select class="form-control">
                        <option data-display="Show 12">Show 12</option>
                        <option value="1">Show 20</option>
                        <option value="2">Show 30</option>
                      </select>
                    </div> -->
                  </div>
                </div>
              </div>
              <Skeleton v-if="loading" />
              <div
                class="col-lg-4 col-sm-6"
                v-for="(item, index) in result"
                :key="index"
              >
                <div class="single_category_product">
                   <b-badge variant="primary" class="view-marca"> {{item.marca}} </b-badge>
                  <div class="single_category_img">
                    <img :src="url + item.url" class="img-carta" />
                    <div class="category_social_icon">
                      <ul>
                        <li>
                          <a href="#"><i class="fas fa-heart"></i></a>
                        </li>
                        <li>
                          <a
                            class="text-white cursor"
                            @click="modalCantidad(item)"
                            ><i class="fas fa-shopping-bag"></i
                          ></a>
                        </li>
                      </ul>
                    </div>
                    <div class="category_product_text">
                      <NuxtLink :to="'/product/' + item.id">
                        <h5 class="text-center">{{ item.descripcion }}</h5>
                      </NuxtLink>
                      <p>${{ item.precio_venta }}</p>
                      <b-badge variant="primary" v-if="item.agregado"
                        ><i class="fas fa-check"></i> agregado({{
                          item.cantidad
                        }})</b-badge
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Skeleton v-if="loadingMore" />
            <div class="col-lg-12 text-center">
              <div v-if="loadingMore"></div>
              <a @click="getMore()" class="btn_2 cursor" v-else-if="btnMore"
                >CARGAR MAS</a
              >
              <b-alert show variant="light" v-else>_ _</b-alert>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-modal v-model="modalAdd" centered hide-footer title="Cantidad">
      <div class="form-row text-center">
        <div class="col-12">
          <form @submit.prevent="addProduct()">
            <b-form-spinbutton
              id="sb-inline"
              v-model="cantidad"
            ></b-form-spinbutton>

            <button
              type="submit"
              class="btn btn-primary my-2"
              :disabled="cantidad < 1"
            >
              <i class="fas fa-shopping-bag"></i> Agregar
            </button>
          </form>
        </div>
      </div>
    </b-modal>
    </b-overlay>
  </div>
</template>
<script>
import axios from "axios";
import Skeleton from "~/components/Skeleton.vue";
export default {
  data() {
    return {
      modalAdd: false,
      cantidad: 0,
      result: [],
      cart: [],
      marcas: [],
      url: "http://127.0.0.1:8000/images/productos/",
      item: {},
      marca: null,
      marca_id: null,
      range: 0,
      filterRange: false,
      search: this.$route.params.slug,
      loading: false,
      page: 1,
      loadingMore: false,
      btnMore: true,
      spinnerMarca: false,
      webService: "http://127.0.0.1:8000",
    };
  },
  created() {
    // if (process.client) {
    //  localStorage.setItem(
    //         "cart",
    //         JSON.stringify([])
    //       );
    //        }

    this.spinnerMarca = true;
    this.getResult();
    this.getCart();
  },
  methods: {
    getResult() {
      this.loading = true;
      this.result = [];
      this.page = 1;
      const params = {
        search: this.search,
        marca_id: this.marca_id,
        page: 1,
      };
      axios
        .post(this.webService + "/api/products/search", params)
        .then((res) => {
          this.result = res.data.products;
          this.marcas = res.data.marcas;
          this.result.forEach((element) => {
            this.cart.forEach((cart) => {
              if (element.id == cart.id) {
                element.agregado = true;
                element.cantidad = cart.cantidad;
              }else{
                element.cantidad = 0;
              }
            });
          });
          if (this.result.length == res.data.count) {
            this.btnMore = false;
          } else {
            this.btnMore = true;
          }
          this.loading = false;
          this.spinnerMarca = false;
        });
    },
    getMore() {
      this.page = this.page + 1;
      this.loadingMore = true;
      const params = {
        search: this.search,
        marca_id: this.marca_id,
        page: this.page,
      };
      axios
        .post(this.webService + "/api/products/get-more-search", params)
        .then((res) => {
          let products = res.data.products;
          products.forEach((element) => {
            this.result.push(element);
          });
          this.result.forEach((element) => {
            this.cart.forEach((cart) => {
              if (element.id == cart.id) {
                element.agregado = true;
                element.cantidad = cart.cantidad;
              }
            });
          });
          if (this.result.length == res.data.count) {
            this.btnMore = false;
          } else {
            this.btnMore = true;
          }
          this.loadingMore = false;
        });
    },
    modalCantidad(item) {
      this.modalAdd = true;
      this.item = item;
      this.cantidad = item.cantidad;
    },
    addProduct() {
      this.getCart();
      let count = 0;
      this.cart.forEach((element) => {
        if (element.id == this.item.id) {
          element.cantidad = this.cantidad;
          count = count + 1;
        }
      });
      if (count < 1) {
        this.pushCart();
      } else {
        this.InsertLocalStorage();
      }
    },
    pushCart() {
      this.cart.push({
        id: this.item.id,
        descripcion: this.item.descripcion,
        precio: this.item.precio_venta,
        marca: this.item.marca,
        img: this.url + this.item.url,
        cantidad: this.cantidad,
      });
      this.InsertLocalStorage();
    },
    InsertLocalStorage() {
      this.$bvToast.toast("agregado: " + this.cantidad, {
        title: "Exito",
        variant: "primary",
        solid: true,
      });
      this.modalAdd = false;
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.item.agregado = true;
      this.item.cantidad = this.cantidad;
      this.cantidad = null;
      this.$nuxt.$emit("count-cantidad", null);
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
    selectMarca(item) {
      this.marca = item.marca;
      this.marca_id = item.marcas_id;
      this.getResult();
    },
    resetGet() {
      this.marca = null;
      this.marca_id = null;
      this.getResult();
    },
    filtrarRange() {
      this.loading = true;
      this.result = [];
      this.page = 1;
      const params = {
        search: this.search,
        marca_id: this.marca_id,
        range: this.range,
        page: 1,
      };
      axios
        .post(this.webService + "/api/products/search", params)
        .then((res) => {
          this.result = res.data.products;
          this.marcas = res.data.marcas;
          this.result.forEach((element) => {
            this.cart.forEach((cart) => {
              if (element.id == cart.id) {
                element.agregado = true;
                element.cantidad = cart.cantidad;
              }
            });
          });
          if (this.result.length == res.data.count) {
            this.btnMore = false;
          } else {
            this.btnMore = true;
          }
          this.loading = false;
          this.spinnerMarca = false;
        });
    },
  },
};
</script>
