<template>
  <div>
    <Menu :home="false" ref="menuRef" />
    <loading v-if="loading" /><br /><br /><br /><br /><br />
    <b-container>
      <b-row>
        <b-col cols="8">
          <b-card class="bg-secondary">
            <b-form>
              <b-row>
                <b-col>
                  <b-form-group
                    id="input-group-2"
                    label="Ruc o dni:"
                    label-for="input-2"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="cliente.ruc_dni"
                      :class="
                        compra.send && cliente.ruc_dni == ''
                          ? 'border-danger'
                          : ''
                      "
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="input-group-1"
                    label="Nombre:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      type="text"
                      v-model="cliente.nombre"
                      :class="
                        compra.send && cliente.nombre == ''
                          ? 'border-danger'
                          : ''
                      "
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group
                    id="input-group-1"
                    label="Direccion:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      type="text"
                      v-model="cliente.direccion"
                      :class="
                        compra.send && cliente.direccion == ''
                          ? 'border-danger'
                          : ''
                      "
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="input-group-2"
                    label="Telefono:"
                    label-for="input-2"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="cliente.telefono"
                      :class="
                        compra.send && cliente.telefono == ''
                          ? 'border-danger'
                          : ''
                      "
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-container class="text-center">
                <b-button variant="primary" @click="finalizarCompra()"
                  >Enviar pedido (${{ totalAmount.toFixed(2) }})</b-button
                >
              </b-container>
            </b-form>
          </b-card>
        </b-col>
        <b-col cols="4">
          <b-card class="bg-secondary">
            <b-form-group label="Documento:">
              <b-form-radio
                v-model="compra.documento"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="1"
                >Boleta</b-form-radio
              >
              <b-form-radio
                v-model="compra.documento"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="2"
                >Factura</b-form-radio
              >
            </b-form-group>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      cliente: {
        ruc_dni: "",
        nombre: "",
        direccion: "",
        telefono: "",
      },
      documentos: [
        {
          value: null,
          text: "Por favor seleccionar documento",
          disabled: true,
        },
        { value: 1, text: "Boleta" },
        { value: 2, text: "Factura" },
      ],
      compra: {
        documento: "",
        send: false,
      },
    };
  },
  created() {
    if (process.client) {
      let cliente = JSON.parse(localStorage.getItem("cliente"));
      let documento = JSON.parse(localStorage.getItem("documento"));
      if (cliente != null) this.cliente = cliente;
      if (documento != null) this.compra.documento = documento;
    }
  },
  methods: {
    finalizarCompra() {
      this.compra.send = true;
      if (
        this.cliente.ruc_dni.trim() == "" ||
        this.cliente.nombre.trim() == "" ||
        this.cliente.direccion.trim() == "" ||
        this.cliente.telefono.trim() == "" ||
        this.compra.documento.trim() == ""
      ) {
        this.$bvToast.toast("completar todos los campos", {
          title: "Error",
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });
        return;
      }
      this.loading = true;
      const params = {
        productos: this.$store.state.cart,
        ruc_dni: this.cliente.ruc_dni,
        nombre: this.cliente.nombre,
        direccion: this.cliente.direccion,
        telefono: this.cliente.telefono,
        total: this.totalAmount,
        documento: this.compra.documento,
        entrega: "",
        adicional: 0,
      };
      axios
        .post(process.env.BASE_URL + "/api/ventas/generar-venta", params)
        .then((res) => {
          if (process.client) {
            localStorage.setItem("cliente", JSON.stringify(this.cliente));
            localStorage.setItem(
              "documento",
              JSON.stringify(this.compra.documento)
            );
            this.generarHistorialLocal();
            this.compra.send = false;
            this.$store.commit("clearCart");
            this.$refs.menuRef.cantidadCart();
            this.loading = false;
          }
        });
    },
    generarHistorialLocal() {
      if (process.client) {
        let historial = JSON.parse(localStorage.getItem("record"));
        let array = [];
        if (historial != null) {
          this.$store.state.cart.forEach((element) => {
            element.cantidad = 0;
            historial.forEach((elementH) => {
              if (element.id != elementH.id) {
                array.push(element);
              }
            });
          });
          localStorage.setItem("record", JSON.stringify(array));
        } else {
          let array = [];
          this.$store.state.cart.forEach((element) => {
            element.cantidad = 0;
            array.push(element);
          });
          localStorage.setItem("record", JSON.stringify(array));
        }
      }
    },
  },
  computed: {
    totalAmount() {
      return this.$store.state.cart.reduce((total, item) => {
        return total + item.precio * item.cantidad;
      }, 0);
    },
  },
};
</script>