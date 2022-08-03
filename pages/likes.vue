<template>
  <div>
    <Menu :home="false" />
    <Skeleton v-if="loading" />
    <div class="col-lg-4 col-sm-6" v-for="(item, index) in result" :key="index">
      <div class="single_category_product">
        <b-badge variant="primary" class="view-marca">
          {{ item.marca }}
        </b-badge>
        <div class="single_category_img">
          <img :src="urlImg + item.url" class="img-carta" />
          <div class="category_social_icon">
            <ul>
              <li>
                <a class="text-white cursor" @click="modalCantidad(item)"
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
export default {
  components: { Loading },
  data() {
    return {
      loading: false,
      page: 1,
      loadingMore: false,
      btnMore: true,
      result: [],
      pagination: {
        count: 0,
        urlImg: process.env.BASE_URL + "/images/productos/",
        modalAdd: false,
      },
      cantidad: 0,
    };
  },
  created() {
    this.getResult();
  },
  methods: {
    getResult() {
      this.loading = true;
      const params = {
        ruc_dni: 12,
      };
      axios
        .post(process.env.BASE_URL + "/api/products/likes", params)
        .then((res) => {
          this.result = res.data.products;
          this.loading = false;
        });
    },
    modalCantidad(item) {
      this.key = this.key + 1;
      this.modalAdd = true;
      this.item = item;
      this.cantidad = item.cantidad;
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
    closeModal() {
      this.modalAdd = false;
    },
  },
};
</script>