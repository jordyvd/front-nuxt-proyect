<template>
  <div class="modal-dialog text-center">
    <div class="col-sm-12 main-section">
      <div class="modal-content bg-transparent">
        <div class="col-12 user-img">
          <img src="/images/key.png" />
        </div>
        <form class="col-12" @submit.prevent="ingresar">
          <div class="form-group user" id="dni">
            <input
              type="text"
              class="form-control"
              placeholder="Ruc o DNI"
              v-model="ruc"
            />
          </div>
          <div class="form-group con" id="contrasena-group">
            <input
              type="password"
              class="form-control"
              placeholder="Contraseña"
              v-model="password"
            />
            <!-- <b-form-invalid-feedback
          id="input-1-live-feedback"
        >This is a required field and must be at least 3 characters.</b-form-invalid-feedback> -->
          </div>
          <button type="submit" class="btn btn-primary" v-if="!spinner">
            <i class="fas fa-sign-in-alt"></i> Ingresar
          </button>
          <button class="btn btn-primary" disabled v-else>
            <b-spinner small></b-spinner>
          </button>
        </form>
        <div class="col-12 forgot">
          <a href="#">Recordar contraseña?</a>
        </div>
        <div class="col-12 forgot">
          <small class="text-primary" @click="registrate()"
            >Si eres nuevo, registrate aquí</small
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import FunctionG from "./Function";
export default {
  mixins: [FunctionG],
  data() {
    return {
      ruc: "",
      password: "",
      user: {},
      spinner: false,
    };
  },
  created() {},
  methods: {
    registrate() {
      this.$emit("click", false);
    },
    ingresar() {
      if (this.ruc.trim() === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "el ruc es requerido",
        });
      } else if (this.password.trim() === "") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "la contraseña es requerida",
        });
      } else {
        this.spinner = true;
        const params = { ruc: this.ruc, password: this.password };
        axios
          .post(process.env.BASE_URL + "/api/auth/login", params)
          .then((res) => {
            if (res.data.success) {
              this.$bvToast.toast("Bienvenido(a) " + res.data.usuario.name, {
                title: "Perfecto!",
                variant: "primary",
                solid: true,
              });
              this.$store.commit("userLogNuevo", res.data.usuario);
              this.spinner = false;
            }
          })
          .catch((error) => {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: "los datos ingresados son incorrectos",
              footer: '<a href="">Why do I have this issue?</a>',
            });

            this.spinner = false;
          });
      }
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

.form-group#dni::before {
  content: "\f2c2" !important;
}

.form-group#contrasena-group::before {
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
  color: white;
}
small {
  transition: 0.5s;
  cursor: pointer;
}
small:hover {
  border-bottom: 1px solid;
}
</style>
