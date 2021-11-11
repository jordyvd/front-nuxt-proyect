<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="section-title">
          <span>Latest News</span>
          <h2>Fashion New Trends</h2>
        </div>
      </div>
    </div>
    <section class="cat_product_area border_top">
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
                v-for="(item, index) in 12"
                :key="index"
              >
                <div class="single_category_product">
                  <div class="single_category_img">
                    <img :src="img" alt="" />
                    <div class="category_social_icon">
                      <ul>
                        <li>
                          <a class="text-white cursor" @click="like()"
                            ><i class="fas fa-heart"></i
                          ></a>
                        </li>
                        <li>
                          <a class="text-white cursor" @click="openModalCantidad()"
                            ><i class="fas fa-shopping-bag"></i
                          ></a>
                        </li>
                      </ul>
                    </div>
                    <div class="category_product_text">
                      <NuxtLink to="/product">
                        <h5>Long Sleeve TShirt</h5>
                      </NuxtLink>
                      <p>$150.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-modal v-model="modalCantidad" centered hide-footer title="Cantidad">
      <div class="form-row text-center">
        <div class="col-12">
          <input
            type="number"
            placeholder="Escribir..."
            class="form-control input-system"
            v-model="cantidad"
          />
          <button type="submit" class="btn btn-primary my-2" @click="agregar()" :disabled="cantidad < 1">
            <i class="fas fa-shopping-bag"></i> Agregar
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: "https://siempreauto.com/wp-content/uploads/sites/9/2021/08/damper-2118130_1280.jpg?quality=60&strip=all&w=1200",
      modalCantidad: false,
      cantidad: null,
    };
  },
  created() {},
  methods: {
    openModalCantidad() {
      this.modalCantidad = true;
    },
    agregar() {
      this.$bvToast.toast("agregado: " + this.cantidad, {
        title: "Exito",
        variant: "primary",
        solid: true,
      });
      this.modalCantidad = false;
      this.cantidad = null;
    },
    like(){
       this.$bvToast.toast("es necesario iniciar sesión", {
        title: "Error",
        variant: "success",
        solid: true,
      });
    }
  },
};
</script>