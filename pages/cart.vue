<template>
  <div>
    <Menu :home="false" />
    <section class="cart_area section_padding">
      <div class="container">
        <div class="cart_inner">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="color-system">Producto</th>
                  <th scope="col" class="color-system">Precio</th>
                  <th scope="col" class="color-system">Cantidad</th>
                  <th scope="col" class="color-system">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in $store.state.cart" :key="index">
                  <td>
                    <div class="media">
                      <div class="d-flex">
                        <img :src="item.img" alt="" />
                      </div>
                      <div class="media-body">
                        <p>{{ item.descripcion }}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h5 class="color-system">${{ item.precio }}</h5>
                  </td>
                  <td>
                    <!-- <div class="product_count">
                      <span
                        class="input-number-decrement"
                        @click="cantidadCalculate(item, '-')"
                      >
                        <i class="fas fa-minus"></i
                      ></span>
                      <input
                        class="input-number"
                        type="text"
                        :value="item.cantidad"
                        min="0"
                        max="10"
                      />
                      <span
                        class="input-number-increment"
                        @click="cantidadCalculate(item, '+')"
                      >
                        <i class="fas fa-plus"></i
                      ></span>
                    </div> -->
                    <b-form-spinbutton
                      @change="countCart()"
                      id="sb-inline"
                      v-model="item.cantidad"
                      inline
                    ></b-form-spinbutton>
                  </td>
                  <td>
                    <h5 class="color-system">${{ item.precio * item.cantidad }}</h5>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <h5 class="color-system">Total</h5>
                  </td>
                  <td>
                    <h5 class="color-system">$ {{ subTotal }}</h5>
                  </td>
                </tr>
                <!-- <tr class="shipping_area">
                  <td></td>
                  <td></td>
                  <td>
                    <h5>Envio</h5>
                  </td>
                  <td>
                    <div class="shipping_box">
                      <ul class="list">
                        <li>
                          Lima: S/.0.00
                          <input
                            type="radio"
                            aria-label="Radio button for following text input"
                          />
                        </li>
                        <li>
                          Provincias: $10.00
                          <input
                            type="radio"
                            aria-label="Radio button for following text input"
                          />
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <h5>Total</h5>
                  </td>
                  <td>
                    <h5>$ {{ subTotal }}</h5>
                  </td>
                </tr> -->
              </tbody>
            </table>
            <div class="checkout_btn_inner float-right my-3">
              <a class="btn_1" href="#">Continuar comprando</a>
              <a class="btn_1 checkout_btn_1" href="#">Finalizar compra</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: "https://www.tiendamotorista.com/65914-large_default/copy-of-amortiguador-trasero-moto-honda-crf-250-l-2017-2019-yss-top-line-gas-z-60501899.jpg",
      cantidad: 0,
    };
  },
  methods: {
    cantidadCalculate(item, operador) {
      if (item.cantidad >= 1) {
        if (operador == "+") {
          return (item.cantidad = parseInt(item.cantidad) + 1);
        } else {
          return (item.cantidad = parseInt(item.cantidad) - 1);
        }
      }
    },
    countCart() {
      this.$nuxt.$emit("count-cantidad", null);
    },
  },
  computed: {
    subTotal() {
      return this.$store.state.cart.reduce((total, item) => {
        return total + item.precio * item.cantidad;
      }, 0);
    },
  },
};
</script>