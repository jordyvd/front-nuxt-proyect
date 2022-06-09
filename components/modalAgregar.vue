<template>
  <b-modal
    v-model="modal"
    centered
    hide-footer
    title="Cantidad"
    title-class="color-system"
    @hide="closeModal"
  >
    <div class="form-row text-center">
      <div class="col-12">
        <form @submit.prevent="agregar()">
          <b-form-spinbutton
            id="sb-inline"
            v-model="cantidadAgregado"
          ></b-form-spinbutton>

          <button
            type="submit"
            class="btn btn-primary my-2 third-bg-color"
            :disabled="cantidadAgregado < 1"
          >
            <i class="fas fa-shopping-bag"></i> Agregar
          </button>
        </form>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
  props: ["modal", "cantidad", "item"],
  data() {
    return {
      cart: [],
      cantidadAgregado: 0,
      url: process.env.BASE_URL + "/images/productos/",
    };
  },
  created() {
    this.cantidadAgregado = this.cantidad != null ? this.cantidad : 0;
  },
  methods: {
    agregar() {
      this.getCart();
      this.pushCart();
      console.log(this.cart)
      this.InsertLocalStorage();
      this.$nuxt.$emit("count-cantidad", null);
      this.$emit("agregar", this.cantidadAgregado, this.cart);
      this.$bvToast.toast("agregado: " + this.cantidadAgregado, {
        title: "Exito",
        variant: "primary",
        solid: true,
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
    pushCart() {
      let existe = false;
      this.cart.forEach((element) => {
        if (element.id == this.item.id) {
          element.cantidad = this.cantidadAgregado;
          existe = true;
        }
      });
      if(existe) return;
      this.cart.push({
        id: this.item.id,
        descripcion: this.item.descripcion,
        precio: this.item.precio_venta,
        marca: this.item.marca,
        img: this.url + this.item.url,
        cantidad: this.cantidadAgregado,
      });
    },
    InsertLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>