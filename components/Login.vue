<template>
  <div class="modal-dialog text-center">
    <div class="col-sm-12 main-section">
      <div class="modal-content bg-transparent">
        <div class="col-12 user-img">
          <img
            src="https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png"
          />
        </div>
        <form class="col-12" @submit.prevent="ingresar">
          <div class="form-group user" id="user-group">
            <input
              type="text"
              class="form-control"
              placeholder="Nombre de usuario"
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
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-sign-in-alt"></i> Ingresar
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
import FunctionG from './Function';
export default {
  mixins:[FunctionG],
  data() {
    return {
      ruc: "8887778887",
      password: "12345678955a",
      user:{},
    };
  },
  created(){

  },
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
        const params = { ruc: this.ruc, password: this.password };
        axios
          .post(process.env.BASE_URL + "/api/auth/login", params)
          .then((res) => {
            if (res.data.success) {
              this.$bvToast.toast("Bienvenido(a) "+res.data.usuario.name, {
                title: "Perfecto!",
                variant: "primary",
                solid: true,
              });
              this.saveLogin(res.data.usuario);
            }
          })
          .catch((error) => {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: "los datos ingresados son incorrectos",
              footer: '<a href="">Why do I have this issue?</a>',
            });
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
  font-size: 18px;
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
