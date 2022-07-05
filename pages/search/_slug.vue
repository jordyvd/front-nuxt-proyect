<template>
  <div>
    <Menu :home="false" />
    <loading v-if="loading" />
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
              <aside class="left_widgets p_filter_widgets">
                <div class="l_w_title">
                  <h3 class="bg-secondary text-white">Marcas encontradas</h3>
                </div>
                <div class="widgets_inner">
                  <small
                    v-if="marcas.length == 0"
                    class="text-danger flex-center"
                  >
                    marcas no encontradas</small
                  >
                  <ul class="list" v-else>
                    <p
                      class="text-marca pointer text-bold text-uppercase"
                      v-if="marca != null"
                      @click="resetGet()"
                    >
                      <b-alert
                        show
                        variant="light"
                        class="border bg-secondary color-system"
                        ><i class="fas fa-trash-alt"></i> {{ marca }}</b-alert
                      >
                    </p>
                    <li v-for="(item, index) in marcas" :key="index">
                      <div>
                        <a
                          @click.prevent="selectMarca(item)"
                          class="text-marca pointer text-uppercase text-white"
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
                    <span class="text-search color-system border-b-text">{{
                      $route.params.slug
                    }}</span>
                  </div>
                  <!-- **** sin resultados **** -->
                  <div v-if="result.length == 0 && !loading" class="w-100">
                    <div class="flex-center">
                      <img src="/no-results.png" width="200" alt="" />
                    </div>
                    <div class="flex-center mt-4">
                      <b class="color-system">NO SE ENCONTRARON RESULTADOS</b>
                    </div>
                    <small class="flex-center color-system"
                      >Verifique si escribio correctamente lo que buscaba, o
                      intente con otros parametros</small
                    >
                  </div>
                  <!-- **** fin sin resultados **** -->
                  <div
                    class="product_top_bar_iner product_bar_item d-flex"
                    v-else
                  >
                    <!-- <div class="product_bar_single">
                      <select class="wide form-control" v-model="orderBy">
                        <option value="" hidden>Ordenar por</option>
                        <option value="0">Precios mas bajos</option>
                        <option value="1">Precios mas altos</option>
                      </select>
                    </div> -->
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
                v-for="(item, index) in mergeResultAndAdded"
                :key="index"
              >
                <div class="single_category_product">
                  <b-badge variant="primary" class="view-marca">
                    {{ item.marca }}
                  </b-badge>
                  <div class="single_category_img">
                    <img :src="urlImg + item.url" class="img-carta" />
                    <div class="category_social_icon">
                      <ul>
                        <li>
                          <a
                            class="text-white cursor"
                            @click="agregarFavoritos(item)"
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
            <Skeleton v-if="loadingMore" />
            <div class="col-lg-12 text-center">
              <a
                @click="getMore()"
                class="btn_2 bg-secondary text-white cursor"
                v-if="btnMore"
                >CARGAR MAS</a
              >
              <b-alert show class="bg-transparent border-0" v-else>_ _</b-alert>
            </div>
          </div>
        </div>
      </div>
    </section>
    <modal-agregar
      ref="modalAgregar"
      :modal="modalAdd"
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
import Loading from "~/components/Loading.vue";
import Functions from "../../components/Function";
export default {
  mixins: [Functions],
  components: { Loading },
  data() {
    return {
      modalAdd: false,
      cantidad: 0,
      result: [],
      cart: [],
      marcas: [],
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
      orderBy: null,
      pagination: {
        count: 0,
      },
      urlImg: process.env.BASE_URL + "/images/productos/",
      key: 0,
    };
  },
  created() {
    this.spinnerMarca = true;
    this.getResult();
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
        order_by: this.orderBy,
      };
      axios
        .post(process.env.BASE_URL + "/api/products/search", params)
        .then((res) => {
          this.result = res.data.products;
          this.marcas = res.data.marcas;
          this.pagination.cantidad = res.data.count;
          if (this.result.length == this.pagination.cantidad) {
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
        order_by: this.orderBy,
      };
      axios
        .post(process.env.BASE_URL + "/api/products/get-more-search", params)
        .then((res) => {
          this.result = res.data.products;
          // let products = res.data.products;
          // products.forEach((element) => {
          //   this.result.push(element);
          // });
          // this.result.forEach((element) => {
          //   this.cart.forEach((cart) => {
          //     if (element.id == cart.id) {
          //       element.agregado = true;
          //       element.cantidad = cart.cantidad;
          //     }
          //   });
          // });
          if (this.result.length == this.pagination.cantidad) {
            this.btnMore = false;
          } else {
            this.btnMore = true;
          }
          this.loadingMore = false;
        });
    },
    modalCantidad(item) {
      this.key = this.key + 1;
      this.modalAdd = true;
      this.item = item;
      this.cantidad = item.cantidad;
    },
    closeModal() {
      this.modalAdd = false;
    },
    agregarFavoritos(item) {
      if (this.$store.state.user == null) {
        this.$bvToast.toast("es necesario iniciar sesión", {
          title: "Error",
          variant: "warning",
          solid: true,
        });
      } else {
        this.loading = true;
        const params = {
          id: item.id,
          ruc: this.$store.state.user.ruc,
        };
        axios
          .post(process.env.BASE_URL + "/api/products/agregar-favorito", params)
          .then((res) => {
            this.$bvToast.toast("producto agregado", {
              title: "Gracias!",
              variant: "primary",
              solid: true,
              toaster: "b-toaster-bottom-right",
            });
            this.loading = false;
          });
      }
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
    selectMarca(item) {
      this.marca = item.marca;
      this.marca_id = item.id;
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
        .post(process.env.BASE_URL + "/api/products/search", params)
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
  computed: {
    mergeResultAndAdded() {
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
