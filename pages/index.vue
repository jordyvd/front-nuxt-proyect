<template>
  <div class="bg-system">
    <Menu :home="true" />
    <section class="banner_part border-b-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <div class="banner_slider">
              <div class="single_banner_slider">
                <div class="banner_text" style="height: 90vh">
                  <div class="banner_text_iner">
                    <h5 class="text-white">ventas de repuestos</h5>
                    <h1 class="text-white">camiones y buses</h1>
                    <NuxtLink :to="'/search'" class="btn_1">
                      Productos
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <h4>LLAMADA</h4>
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
          <h2 class="card-title">¿Quiénes somos?</h2>
          <p class="card-text">
            MOTORTEC, es una compañía dedicada a la importación y distribución a
            nivel nacional de repuestos para camiones y autobuses en la línea
            pesada. Estableciendo relaciones comerciales internacionales con
            fabricantes de equipo original, Ofrecemos para el mercado de
            reposición la mayor variedad de repuestos; partes de motor,
            embragues, dirección, partes eléctricas, suspensión, sistema de
            combustible, entre otros para vehículos Volvo, Scania y
            Mercedes-Benz, Freightliner Volkswagen, Iveco y Agrale
          </p>
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