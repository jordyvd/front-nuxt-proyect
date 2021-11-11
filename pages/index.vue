<template>
  <div>
    <Menu :home="true"/>
    <section class="banner_part">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <div class="banner_slider">
              <div class="single_banner_slider">
                <div class="banner_text">
                  <div class="banner_text_iner">
                    <h5 class="text-white">Motortect</h5>
                    <h1 class="text-white">repuestos para linea pesada</h1>
                    <a href="#" class="btn_1">shop now</a>
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
              <img src="/delivery.webp" alt="" />
              <h4>Free shipping</h4>
              <p>
                Divided face for bearing the divide unto seed winged divided
                light Forth.
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="single_shopping_details">
              <img src="/reloj.webp" alt="" />
              <h4>Free shipping</h4>
              <p>
                Divided face for bearing the divide unto seed winged divided
                light Forth.
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="single_shopping_details">
              <img src="/list.webp" alt="" />
              <h4>Free shipping</h4>
              <p>
                Divided face for bearing the divide unto seed winged divided
                light Forth.
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="single_shopping_details">
              <img src="/tarjeta.webp" alt="" />
              <h4>Free shipping</h4>
              <p>
                Divided face for bearing the divide unto seed winged divided
                light Forth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title">
            <span>Latest News</span>
            <h2>Fashion New Trends</h2>
          </div>
        </div>
      </div>
      <div class="container border-top"></div>
      <br />
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col my-2 card-categories">
          <div class="card border-0 bg-transparent">
            <img
              src="https://st.depositphotos.com/1005404/2257/i/950/depositphotos_22579299-stock-photo-car-parts.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <ul>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
              </ul>
              <button class="btn btn-categories">
                <i class="fas fa-angle-double-right"></i> VER PRODUCTOS
              </button>
            </div>
          </div>
        </div>
        <div class="col my-2 card-categories">
          <div class="card border-0 bg-transparent">
            <img
              src="https://st.depositphotos.com/1005404/2257/i/950/depositphotos_22579299-stock-photo-car-parts.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <ul>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
              </ul>
              <button class="btn btn-categories">
                <i class="fas fa-angle-double-right"></i> VER PRODUCTOS
              </button>
            </div>
          </div>
        </div>
        <div class="col my-2 card-categories">
          <div class="card border-0 bg-transparent">
            <img
              src="https://st.depositphotos.com/1005404/2257/i/950/depositphotos_22579299-stock-photo-car-parts.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <ul>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
              </ul>
              <button class="btn btn-categories">
                <i class="fas fa-angle-double-right"></i> VER PRODUCTOS
              </button>
            </div>
          </div>
        </div>
        <div class="col my-2 card-categories">
          <div class="card border-0 bg-transparent">
            <img
              src="https://st.depositphotos.com/1005404/2257/i/950/depositphotos_22579299-stock-photo-car-parts.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <ul>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
                <li>texto de prueba de cacte</li>
              </ul>
              <button class="btn btn-categories">
                <i class="fas fa-angle-double-right"></i> VER PRODUCTOS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="section-info my-5">
      <div class="card container border-0 bg-transparent">
        <div class="card-body bg-transparent">
          <h2 class="card-title">Special title treatment</h2>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-banner">Go somewhere</a>
        </div>
      </div>
    </section>
    <Recomendados />
  </div>
</template>

<script>
import Menu from "~/components/Menu.vue";
export default {
  components: { Menu },
  data() {
    return {};
  },
  created() {
    
  },
};
</script>