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
                v-for="(item, index) in result"
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
                      <NuxtLink to="/product">
                        <h5>{{ item.descripcion }}</h5>
                      </NuxtLink>
                      <p>S/. {{ item.precio_venta }}</p>
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
          </div>
        </div>
      </div>
      <b-alert v-else>no se encontro resultados</b-alert>
    </section>
    <b-modal v-model="modal" centered hide-footer title="Cantidad">
      <div class="form-row text-center">
        <div class="col-12">
          <input
            type="number"
            placeholder="Escribir..."
            class="form-control input-system"
            v-model="cantidad"
          />
          <button
            type="submit"
            class="btn btn-primary my-2"
            @click="addProduct()"
          >
            <i class="fas fa-shopping-bag"></i> Agregar
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["param"],
  data() {
    return {
      modal: false,
      result: [],
      cart: [],
      item: {},
      cantidad: 0,
      loading: false,
      urlImg: process.env.BASE_URL + "/images/productos/",
    };
  },
  created() {
    this.getRelacionados();
    this.getCart();
  },
  methods: {
    modalCantidad(item) {
      this.modal = true;
      this.item = item;
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
          this.result.forEach((element) => {
            this.cart.forEach((cart) => {
              if (element.id == cart.id) {
                element.agregado = true;
                element.cantidad = cart.cantidad;
              }
            });
          });
          this.loading = false;
        });
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
      this.modal = false;
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.item.agregado = true;
      this.item.cantidad = this.cantidad;
      this.cantidad = null;
      this.$nuxt.$emit("count-cantidad", null);
    },
  },
};
</script>