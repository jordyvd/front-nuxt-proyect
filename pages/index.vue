<template>
  <div class="bg-system">
    <Menu :home="true" />
    <section class="banner">
      <div class="banner-text">
        <h1>REPUESTOS PARA BUSES Y CAMIONES</h1>
         <p>compra fácil y rápido gracias a MOTORTEC</p>
         <NuxtLink :to="'/search'" class="btn btn-area">
            Productos
          </NuxtLink>
      </div>
    </section>
    <!-- section_padding -->
    <section class="shipping_details bg-transparent my-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-sm-6">
            <div class="single_shopping_details">
              <i class="fas fa-truck"></i>
              <h4>ENVIOS</h4>
              <p>Detalle del servicio</p>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="single_shopping_details">
              <i class="fas fa-headset"></i>
              <h4>CONTACTO</h4>
              <p>Detalle del servicio</p>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="single_shopping_details">
              <i class="fas fa-clipboard-list"></i>
              <h4>PRODUCTOS</h4>
              <p>Detalle del servicio</p>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="single_shopping_details">
              <i class="fas fa-credit-card"></i>
              <h4>METODOS DE PAGO</h4>
              <p>Detalle del servicio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <marcas-recomendadas />
    <!-- <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title">
            <span>POPULARES</span>
            <h2>MARCAS RECOMENDADAS</h2>
          </div>
        </div>
      </div>
      <div class="container border-top"></div>
      <br />

      <Recomendados />
    </div> -->
    <section class="section-info my-5 border-b-white border-t-white">
      <div class="card container border-0 bg-transparent">
        <div class="card-body bg-transparent">
          <h2 class="card-title">Conoce todos nuestros productos disponibles</h2>
          <!-- <p class="card-text">
            MOTORTEC, venta de repuestos en linea al alcanze de tus manos!
          </p> -->
          <NuxtLink :to="'/search'" class="btn btn-banner">
            Productos
          </NuxtLink>
        </div>
      </div>
    </section>
    <Recomendados />
  </div>
</template>

<script>
import MarcasRecomendadas from "~/components/MarcasRecomendadas.vue";
import Menu from "~/components/Menu.vue";
export default {
  components: { Menu, MarcasRecomendadas },
  data() {
    return {
      api: process.env.NEXT_PUBLIC_API_BACKEND,
    };
  },
  created() {
    // alert(process.env.API_MOTORTECT_BACK)
  },
  mounted() {
    this.api = process.env.NEXT_PUBLIC_API_BACKEND;
  },
};
</script>