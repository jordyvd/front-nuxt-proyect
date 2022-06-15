<template>
  <div class="modal-dialog text-center">
    <div class="col-sm-12 main-section">
      <div class="modal-content bg-transparent">
        <div class="col-12 user-img">
          <img src="/images/key.png" />
        </div>
        <form class="col-12" method="get" @submit.prevent="registrar">
          <div class="form-group user" id="user-group">
            <input
              type="text"
              class="form-control"
              placeholder="Nombre de usuario"
              v-model="nombre"
            />
          </div>
          <div class="form-group user" id="dni">
            <input
              type="text"
              class="form-control"
              placeholder="Ruc o dni"
              v-model="ruc"
            />
          </div>
          <div class="form-group user" id="phone">
            <input
              type="text"
              class="form-control"
              placeholder="Teléfono"
              v-model="telefono"
            />
          </div>
          <div class="form-group user" id="email">
            <input
              type="text"
              class="form-control"
              placeholder="Correo"
              v-model="correo"
            />
          </div>
          <div class="form-group user" id="address">
            <input
              type="text"
              class="form-control"
              placeholder="Dirección"
              v-model="direccion"
            />
          </div>
          <div class="form-group con" id="contrasena-group">
            <input
              type="password"
              class="form-control"
              placeholder="Contraseña"
              v-model="contraseña"
            />
          </div>
          <div class="form-group con" id="confirmar">
            <input
              type="password"
              class="form-control"
              placeholder="Confirmar contraseña"
              v-model="confirmar"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="!validarCampos"
            v-if="!spinner"
          >
            <i class="fas fa-sign-in-alt"></i> Registrar
          </button>
          <button class="btn btn-primary" disabled v-else>
            <b-spinner small></b-spinner>
          </button>
        </form>
        <div class="col-12 forgot">
          <a href="#" class="text-white">Recordar contraseña?</a>
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
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
export default {
  data() {
    return {
      nombre: "",
      ruc: "",
      telefono: "",
      correo: "",
      direccion: "",
      contraseña: "",
      confirmar: "",
      spinner: false,
    };
  },
  methods: {
    loginForm() {
      this.$emit("click", false);
    },
    registrar() {
      if (!this.validarCampos) return;
      if (this.contraseña != this.confirmar) {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "las contraseñas no coinciden",
        });
      }
      this.spinner = true;
      const params = {
        name: this.nombre,
        ruc: this.ruc,
        telefono: this.telefono,
        email: this.correo,
        direccion: this.direccion,
        password: this.contraseña,
      };
      axios
        .post(process.env.BASE_URL + "/api/auth/register", params)
        .then((res) => {
          if (res.data == "existe") {
            Swal.fire({
              type: "info",
              text: "Este cliente ya esta registrado",
            });
          }
          this.spinner = false;
        });
    },
  },
  computed: {
    validarCampos() {
      if (
        ["", null].includes(this.nombre.trim()) ||
        ["", null].includes(this.ruc.trim()) ||
        ["", null].includes(this.telefono.trim()) ||
        ["", null].includes(this.correo.trim()) ||
        ["", null].includes(this.direccion.trim()) ||
        ["", null].includes(this.contraseña.trim()) ||
        ["", null].includes(this.confirmar.trim())
      ) {
        return false;
      }
      return true;
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
