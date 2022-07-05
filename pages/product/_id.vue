<template>
  <div>
    <Menu :home="false" />

    <loading v-if="skeleton" />
    <b-container v-if="skeleton" class="section_padding">
      <b-row style="height: 50vh">
        <b-col>
          <b-skeleton-img height="50vh" />
        </b-col>
        <b-col>
          <b-skeleton-img height="50vh" />
        </b-col>
      </b-row>
    </b-container>
    <div class="product_image_area section_padding" v-else>
      <div class="container">
        <div class="row s_product_inner">
          <div class="col-lg-5">
            <div class="product_slider_img">
              <div id="vertical">
                <div class="img-details-content">
                  <img :src="urlImg + product.url" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 offset-lg-1">
            <div class="s_product_text">
              <h3 class="color-system">
                {{
                  product.descripcion != null
                    ? product.descripcion.length > 25
                      ? product.descripcion.substr(0, 22) + "..."
                      : product.descripcion
                    : ""
                }}
              </h3>
              <h2 class="color-system">${{ product.precio_venta }}</h2>
              <ul class="list">
                <li>
                  <NuxtLink :to="'/search?s=' + product.marca" class="active">
                    <span class="color-system">Marca</span> :
                    {{ product.marca }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    :to="'/search?s=' + product.procedencia"
                    class="active"
                  >
                    <span class="color-system">Procedencia</span> :
                    {{ product.procedencia }}
                  </NuxtLink>
                </li>
                <li>
                  <a class="color-system">
                    <span>Stock</span> : {{ product.stock }}</a
                  >
                </li>
                <li>
                  <a class="color-system">
                    <span>Código</span> : {{ product.codigo }}</a
                  >
                </li>
                <!-- <li>
                  <a
                    class="color-system"
                    :class="
                      product.codigo_interno == null
                        ? 'text-danger!important'
                        : 'decoration-none'
                    "
                    style="text-decoration: none"
                  >
                    <span>C. Interno</span> :
                    {{
                      product.codigo_interno != null
                        ? product.codigo_interno
                        : "sin código"
                    }}</a
                  >
                </li> -->
              </ul>
              <p>
                {{ product.descripcion }}
              </p>
              <div class="card_area">
                <b-form-spinbutton
                  id="sb-inline"
                  v-model="cantidad"
                  inline
                ></b-form-spinbutton>
                <!-- </div> -->
                <div class="add_to_cart">
                  <a @click.prevent="addProduct()" class="btn_3 cursor"
                    >agregar</a
                  >
                  <a href="#" class="like_us"><i class="fas fa-heart"></i> </a>
                </div>
                <!-- <div class="social_icon">
                  <a href="#" class="fb"><i class="ti-facebook"></i></a>
                  <a href="#" class="tw"><i class="ti-twitter-alt"></i></a>
                  <a href="#" class="li"><i class="ti-linkedin"></i></a>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Relacionados
      class="top-negative"
      :key="update"
      :param="product.descripcion"
    />
    <Recomendados />
  </div>
</template>
<script>
import Relacionados from "~/components/Relacionados.vue";
import axios from "axios";
import Skeleton from "~/components/SkeletonDetalle.vue";
import Loading from "~/components/Loading.vue";
export default {
  components: { Relacionados, Skeleton },
  data() {
    return {
      cantidad: 0,
      product: {},
      update: 0,
      skeleton: true,
      cart: [],
      urlImg: process.env.BASE_URL + "/images/productos/",
    };
  },
  created() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      this.skeleton = true;
      const params = {
        id: this.$route.params.id,
      };
      axios
        .post(process.env.BASE_URL + "/api/products/details", params)
        .then((res) => {
          this.product = res.data[0];
          this.update = ++this.update;
          this.$store.state.cart.forEach((cart) => {
            if (this.product.id == cart.id) {
              this.product.agregado = true;
              this.cantidad = cart.cantidad;
            }
          });
          this.skeleton = false;
        });
    },
    addProduct() {
      if (this.cantidad < 1) return;
      this.pushCart();
      this.$nuxt.$emit("count-cantidad");
      this.$bvToast.toast("agregado: " + this.cantidad, {
        title: "Exito",
        variant: "primary",
        solid: true,
        toaster: "b-toaster-bottom-right",
      });
    },
    pushCart() {
      let existe = false;
      this.$store.state.cart.forEach((element) => {
        if (element.id == this.product.id) {
          element.cantidad = this.cantidad;
          existe = true;
          this.$store.commit("updateCantidad", element);
          this.$store.commit("getCart");
        }
      });
      if (existe) return;
      this.product.cantidad = this.cantidad;
      this.$store.commit("pushCart", this.product);
    },
  },
  watch: {
    "$store.state.cart"(newVal) {
      this.$store.state.cart.forEach((cart) => {
        if (this.product.id == cart.id) {
          this.product.agregado = true;
          this.cantidad = cart.cantidad;
        }
      });
    },
  },
};
</script>
<style scoped>
h3 {
  text-transform: uppercase;
}
</style>