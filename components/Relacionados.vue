<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="section-title">
          <!-- <span>Recomendaciones</span> -->
          <h2 class="border-b-text">PRODUCTOS RELACIONADOS</h2>
        </div>
      </div>
    </div>
    <Skeleton v-if="loading" />
    <div v-if="result.length == 0 && !loading" class="w-100 my-5">
      <div class="flex-center">
        <img src="/no-results.png" width="80" alt="" />
      </div>
      <div class="flex-center my-1">
        <small class="color-system">NO SE ENCONTRARON PRODUCTOS</small>
      </div>
    </div>
    <section class="cat_product_area" v-else>
      <div class="container" v-if="result.length">
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-12">
                <div
                  class="my-2 d-flex justify-content-between align-items-center"
                ></div>
              </div>
              <div
                class="col-lg-3 col-sm-6"
                v-for="(item, index) in mergeRelacionadoAndAdded"
                :key="index"
              >
                <div class="single_category_product">
                  <b-badge variant="primary" class="view-marca bg-secondary">
                    {{ item.marca }}
                  </b-badge>
                  <div class="single_category_img">
                    <img :src="urlImg + item.url" alt="" class="img-carta" />
                    <div class="category_social_icon">
                      <ul>
                        <li>
                          <a class="text-white cursor"
                            ><i class="fas fa-heart"></i
                          ></a>
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
                      <NuxtLink :to="'/product?s=' + item.id">
                        <h5>{{ item.descripcion }}</h5>
                      </NuxtLink>
                      <p>${{ item.precio_venta }}</p>
                      <b-badge variant="primary" v-if="item.cantidad > 0"
                        ><i class="fas fa-check"></i> agregado({{
                          item.cantidad
                        }})</b-badge
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-alert v-else>no se encontro resultados</b-alert>
    </section>
    <modal-agregar
      ref="modalAgregar"
      :key="key"
      :modal="modalAdd"
      :cantidad="cantidad"
      :item="item"
      @agregar="agregar"
      @closeModal="closeModal"
    ></modal-agregar>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["param"],
  data() {
    return {
      modalAdd: false,
      result: [],
      cart: [],
      item: {},
      cantidad: 0,
      loading: false,
      urlImg: process.env.BASE_URL + "/images/productos/",
      key: 0,
    };
  },
  created() {
    this.getRelacionados();
    this.getCart();
  },
  methods: {
    modalCantidad(item) {
      this.key = this.key + 1;
      this.item = item;
      this.cantidad = item.cantidad;
      this.modalAdd = true;
    },
    closeModal() {
      this.modalAdd = false;
    },
    getRelacionados() {
      this.loading = true;
      const params = { descripcion: this.param };
      axios
        .post(process.env.BASE_URL + "/api/products/relacionados", params)
        .then((res) => {
          let products = res.data;
          products.forEach((element) => {
            this.result.push(element);
          });
          // this.result.forEach((element) => {
          //   this.cart.forEach((cart) => {
          //     if (element.id == cart.id) {
          //       element.cantidad = cart.cantidad;
          //     }
          //   });
          // });
          this.loading = false;
        });
    },

    agregar(cantidad, cart) {
      this.modalAdd = false;
      let count = 0;
      cart.forEach((element) => {
        if (element.id == this.item.id) {
          element.cantidad = cantidad;
          count = count + 1;
        }
      });
      this.cantidad = cantidad;
      this.modalAdd = false;
      this.item.cantidad = cantidad;
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
  },
  computed: {
    mergeRelacionadoAndAdded() {
      let array = [];
      this.result.forEach((element) => {
        this.$store.state.cart.forEach((cart) => {
          if (element.id == cart.id) {
            element.cantidad = cart.cantidad;
          }
        });
        array.push(element);
      });
      return array;
    },
  },
};
</script>