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
      this.pushCart();
      this.$nuxt.$emit("count-cantidad");
      this.$emit("agregar", this.cantidadAgregado, this.cart);
      this.$bvToast.toast("agregado: " + this.cantidadAgregado, {
        title: "Exito",
        variant: "primary",
        solid: true,
        toaster: "b-toaster-bottom-right",
      });
    },
    pushCart() {
      let existe = false;
      this.$store.state.cart.forEach((element) => {
        if (element.id == this.item.id) {
          element.cantidad = this.cantidadAgregado;
          existe = true;
          this.$store.commit("updateCantidad", element);
          this.$store.commit("getCart");
        }
      });
      if (existe) return;
      this.item.cantidad = this.cantidadAgregado;
      this.$store.commit("pushCart", this.item);
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>