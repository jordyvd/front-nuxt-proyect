<template>
  <b-modal v-model="modal" centered hide-footer title="Cantidad">
    <div class="form-row text-center">
      <div class="col-12">
        <form @submit.prevent="agregar()">
          <b-form-spinbutton
            id="sb-inline"
            v-model="cantidad"
          ></b-form-spinbutton>

          <button
            type="submit"
            class="btn btn-primary my-2"
            :disabled="cantidad < 1"
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
  props: ["modal", "cantidad"],
  data() {
    return {
      cart: [],
    };
  },
  methods: {
    agregar() {
      this.getCart();
      this.$emit("agregar", this.cantidad, this.cart);
      this.$bvToast.toast("agregado: " + this.cantidad, {
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
  },
};
</script>