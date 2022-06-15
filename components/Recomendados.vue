<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="section-title">
          <span>POPULARES</span><br />
          <h2 class="border-b-text">PRODUCTOS RECOMENDADOS</h2>
        </div>
      </div>
    </div>
    <section class="cat_product_area">
      <div class="container">
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
                      <NuxtLink :to="'/product/' + item.id">
                        <h5 class="text-center">{{ item.descripcion }}</h5>
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
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      urlImg: process.env.BASE_URL + "/images/productos/",
      modalCantidad: false,
      cantidad: 0,
      recomendados: [],
      item: {},
      key: 0,
    };
  },
  created() {
    this.getCart();
    this.getRecomendados();
  },
  methods: {
    getCart() {
      this.$store.commit("getCart");
    },
    getRecomendados() {
      axios
        .post(process.env.BASE_URL + "/api/products/get-recomendados")
        .then((res) => {
          this.recomendados = res.data;
        });
    },
    openModalCantidad(item) {
      this.item = item;
      this.cantidad = item.cantidad == null ? 0 : item.cantidad;
      this.key = this.key + 1;
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
      this.recomendados.forEach((element) => {
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