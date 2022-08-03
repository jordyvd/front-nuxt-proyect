<template>
  <div>
    <Menu :home="false" /><br /><br /><br /><br /><br />
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title">
            <span>HISTORIAL</span><br />
            <h2 class="border-b-text">COMPRAS REALIZADAS</h2>
          </div>
        </div>
      </div>
      <b-alert
        show
        v-if="records.length < 1"
        class="mt-3 bg-transparent text-white text-center"
        >NO HAY PRODUCTOS PARA MOSTRAR</b-alert
      >
      <section class="cat_product_area">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-12">
                  <div
                    class="
                      my-2
                      d-flex
                      justify-content-between
                      align-items-center
                    "
                  ></div>
                </div>
                <div
                  class="col-lg-3 col-sm-6"
                  v-for="(item, index) in mergeProductAndAdded"
                  :key="index"
                >
                  <div class="single_category_product">
                    <b-badge variant="primary" class="view-marca bg-secondary">
                      {{ item.marca }}
                    </b-badge>
                    <div class="single_category_img">
                      <img :src="urlImg + item.url" class="img-carta" />
                      <div class="category_social_icon">
                        <ul>
                          <li>
                            <a
                              class="text-white cursor bg-secondary"
                              @click="like()"
                              ><i class="fas fa-heart"></i
                            ></a>
                          </li>
                          <li>
                            <a
                              class="text-white cursor bg-secondary"
                              @click="openModalCantidad(item)"
                              ><i class="fas fa-shopping-bag"></i
                            ></a>
                          </li>
                        </ul>
                      </div>
                      <div class="category_product_text">
                        <NuxtLink :to="'/product?s=' + item.id">
                          <h5 class="text-center">{{ item.descripcion }}</h5>
                        </NuxtLink>
                        <p>${{ item.precio }}</p>
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
      </section>
      <modal-agregar
        ref="modalAgregar"
        :modal="modalCantidad"
        :cantidad="cantidad"
        :item="item"
        :key="key"
        @agregar="agregar"
        @closeModal="closeModal"
      ></modal-agregar>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      urlImg: process.env.BASE_URL + "/images/productos/",
      modalCantidad: false,
      cantidad: 0,
      records: [],
      item: {},
      key: 0,
    };
  },
  created() {
    this.getCart();
    this.getrecords();
  },
  methods: {
    getCart() {
      this.$store.commit("getCart");
    },
    getrecords() {
      if (process.client) {
        let records = JSON.parse(localStorage.getItem("record"));
        if (records != null) this.records = records;
      }
    },
    openModalCantidad(item) {
      this.item = item;
      this.cantidad = item.cantidad == null ? 0 : item.cantidad;
      this.key = this.key + 1;
      item.precio_venta = item.precio;
      this.modalCantidad = true;
    },
    closeModal() {
      this.modalCantidad = false;
    },
    agregar(cantidad, cart) {
      this.modalCantidad = false;
      let count = 0;
      cart.forEach((element) => {
        if (element.id == this.item.id) {
          element.cantidad = cantidad;
          count = count + 1;
        }
      });
      this.cantidad = cantidad;
      this.modalCantidad = false;
      this.item.agregado = true;
      this.item.cantidad = cantidad;
    },
    like() {
      this.$bvToast.toast("es necesario iniciar sesión", {
        title: "Error",
        variant: "success",
        solid: true,
      });
    },
  },
  computed: {
    mergeProductAndAdded() {
      let array = [];
      this.records.forEach((element) => {
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