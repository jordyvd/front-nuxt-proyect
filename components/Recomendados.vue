<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="section-title">
          <span>MOTORTEC</span><br>
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
                  class="
                    product_top_bar
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                ></div>
              </div>
              <div
                class="col-lg-3 col-sm-6"
                v-for="(item, index) in recomendados"
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
                      <p>${{ item.precio }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <b-modal v-model="modalCantidad" centered hide-footer title="Cantidad">
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
            @click="agregar()"
            :disabled="cantidad < 1"
          >
            <i class="fas fa-shopping-bag"></i> Agregar
          </button>
        </div>
      </div>
    </b-modal> -->
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
      urlImg: process.env.BASE_URL+'/images/productos/',
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
        .post(process.env.BASE_URL + "/api/products/get-recomendados")
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