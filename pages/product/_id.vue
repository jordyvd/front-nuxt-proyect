<template>
  <div>
    <Menu :home="false" />

    <loading v-if="skeleton" />
    <b-container v-if="skeleton" class="section_padding">
      <b-row>
        <b-col>
          <b-skeleton-img height="50vh"/>
        </b-col>
        <b-col>
          <b-skeleton-img/>
        </b-col>
      </b-row>
    </b-container>
    <div class="product_image_area section_padding" v-else>
      <div class="container">
        <div class="row s_product_inner">
          <div class="col-lg-5">
            <div class="product_slider_img">
              <div id="vertical">
                <div data-thumb="img/product_details/prodect_details_1.png">
                  <img :src="url + product.url" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 offset-lg-1">
            <div class="s_product_text">
              <h3>
                {{
                  product.descripcion != null
                    ? product.descripcion.length > 25
                      ? product.descripcion.substr(0, 22) + "..."
                      : product.descripcion
                    : ""
                }}
              </h3>
              <h2>S/. {{ product.precio_venta }}</h2>
              <ul class="list">
                <li>
                  <a class="active" href="#">
                    <span>Marca</span> : {{ product.marca }}</a
                  >
                </li>
                <li>
                  <a href="#"> <span>Availibility</span> : In Stock</a>
                </li>
              </ul>
              <p>
                {{ product.descripcion }}
              </p>
              <div class="card_area">
                <!-- <div class="product_count d-inline-block"> -->
                <!-- <span
                      class="inumber-decrement cursor"
                      @click="cantidad = cantidad - 1"
                    >
                      <i class="fas fa-minus"></i
                    ></span>
                    <input
                      class="input-number"
                      type="text"
                      v-model="cantidad"
                      min="0"
                    />
                    <span
                      class="number-increment cursor"
                      @click="cantidad = cantidad + 1"
                      ><i class="fas fa-plus"></i
                    ></span> -->
                <b-form-spinbutton
                  id="sb-inline"
                  v-model="cantidad"
                  inline
                ></b-form-spinbutton>
                <!-- </div> -->
                <div class="add_to_cart">
                  <a href="" @click.prevent="addProduct()" class="btn_3 cursor"
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
      webService: "http://127.0.0.1:8000",
      product: {},
      url: "http://127.0.0.1:8000/images/productos/",
      update: 0,
      skeleton: true,
      cart: [],
    };
  },
  created() {
    this.getCart();
    this.getDetails();
  },
  methods: {
    getDetails() {
      this.skeleton = true;
      const params = {
        id: this.$route.params.id,
      };
      axios
        .post(this.webService + "/api/products/details", params)
        .then((res) => {
          this.product = res.data[0];
          this.update = ++this.update;
          this.cart.forEach((cart) => {
            if (this.product.id == cart.id) {
              this.product.agregado = true;
              this.cantidad = cart.cantidad;
            }
          });
          this.skeleton = false;
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
        if (element.id == this.product.id) {
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
      this.$nuxt.$emit("count-cantidad", null);
    },
  },
};
</script>
<style scoped>
h3 {
  text-transform: uppercase;
}
</style>