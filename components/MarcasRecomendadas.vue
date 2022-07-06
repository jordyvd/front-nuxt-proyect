<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="section-title">
          <span>POPULARES</span><br />
          <h2 class="border-b-text">MARCAS RECOMENDADAS</h2>
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
                v-for="(item, index) in recomendados"
                :key="index"
              >
                <div class="single_category_product">
                  <b-badge variant="primary" class="view-marca bg-secondary">
                    PRODUCTOS: {{ item.cantidad }}
                  </b-badge>
                  <div class="single_category_img">
                    <img
                      :src="urlImg + item.url"
                      class="img-carta bg-transparent border-system"
                    />
                    <div class="category_product_text">
                      <NuxtLink :to="'/search?s=' + item.nombre">
                        <h5 class="text-center text-uppercase">
                          {{ item.nombre }}
                        </h5>
                      </NuxtLink>
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
      @agregar="agregar"
    ></modal-agregar>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      urlImg: process.env.BASE_URL + "/images/marcas/",
      modalCantidad: false,
      cantidad: 0,
      recomendados: [],
      item: {},
    };
  },
  created() {
    this.getRecomendados();
  },
  methods: {
    getRecomendados() {
      axios
        .get(process.env.BASE_URL + "/api/marca/get-recomendadas")
        .then((res) => {
          this.recomendados = res.data;
        });
    },
    openModalCantidad(item) {
      this.item = item;
      this.cantidad = item.cantidad == null ? 0 : item.cantidad;
      this.modalCantidad = true;
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
      if (count < 1) {
        this.$refs.modalAgregar.pushCart(this.item);
      } else {
        this.$refs.modalAgregar.InsertLocalStorage();
      }
    },
    like() {
      this.$bvToast.toast("es necesario iniciar sesión", {
        title: "Error",
        variant: "success",
        solid: true,
      });
    },
  },
};
</script>