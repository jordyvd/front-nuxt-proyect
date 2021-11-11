<template>
  <div class="modal-dialog text-center">
    <div class="col-sm-12 main-section">
      <div class="modal-content bg-transparent">
        <div class="col-12 user-img">
          <img
            src="https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png"
          />
        </div>
        <form class="col-12" method="get">
          <div class="form-group user" id="user-group">
            <input
              type="text"
              class="form-control"
              placeholder="Nombre de usuario"
              name="username"
            />
          </div>
          <div class="form-group user" id="dni">
            <input
              type="text"
              class="form-control"
              placeholder="Ruc o dni"
              name="username"
            />
          </div>
          <div class="form-group user" id="phone">
            <input
              type="text"
              class="form-control"
              placeholder="Teléfono"
              name="username"
            />
          </div>
          <div class="form-group user" id="email">
            <input
              type="text"
              class="form-control"
              placeholder="Correo"
              name="username"
            />
          </div>
          <div class="form-group user" id="address">
            <input
              type="text"
              class="form-control"
              placeholder="Dirección"
              name="username"
            />
          </div>
          <div class="form-group con" id="contrasena-group">
            <input
              type="password"
              class="form-control"
              placeholder="Contraseña"
              name="password"
            />
          </div>
               <div class="form-group con" id="confirmar">
            <input
              type="password"
              class="form-control"
              placeholder="Confirmar contraseña"
              name="password"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-sign-in-alt"></i> Registrar
          </button>
        </form>
        <div class="col-12 forgot">
          <a href="#">Recordar contraseña?</a>
        </div>
        <div class="col-12 forgot">
          <small class="text-primary" @click="loginForm()"
            >Iniciar sesión</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    loginForm() {
      this.$emit("click", false);
    },
  },
};
</script>

<style scoped>
.main-section {
  margin: 0 auto;
  margin-top: 25%;
  padding: 0;
}
.modal-content {
  opacity: 0.85;
  padding: 0 20px;
  border: none !important;
  background-color: transparent !important;
  backdrop-filter: none !important;
}
.user-img {
  margin-top: -50px;
  margin-bottom: 35px;
}

.user-img img {
  width: 100xp;
  height: 100px;
  /* box-shadow: 0px 0px 3px #848484; */
  border-radius: 50%;
}

.form-group input {
  height: 42px;
  font-size: 15px;
  border: 0;
  padding-left: 54px;
  border-radius: 5px;
}

.form-group::before {
  font-family: "Font Awesome\ 5 Free";
  position: absolute;
  left: 28px;
  font-size: 22px;
  padding-top: 4px;
  font-weight: 900;
}

.form-group#user-group::before {
  content: "\f007" !important;
}
.form-group#dni::before {
  content: "\f2c2" !important;
}
.form-group#phone::before {
  content: "\f2a0" !important;
}
.form-group#email::before {
  content: "\f0e0" !important;
}
.form-group#address::before {
  content: "\f3c5" !important;
}
.form-group#contrasena-group::before {
  content: "\f13e" !important;
}
.form-group#confirmar::before {
  content: "\f023" !important;
}


button {
  width: 60%;
  margin: 5px 0 25px;
}

.forgot {
  padding: 5px 0;
}

.forgot a {
  color: #343a40;
}
small {
  transition: 0.5s;
  cursor: pointer;
}
small:hover {
  border-bottom: 1px solid;
}
</style>
