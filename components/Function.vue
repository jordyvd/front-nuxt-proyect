<script>
module.exports = {
  data() {
    return {
      permiso: [],
      usuario:[],
    };
  },
  computed: {
    user_name() {
      return "kaka";
    },
  },
  methods: {
    saveLogin(usuario) {
      console.log(usuario);
      if (process.client) {
        let usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
        if (usuarioLocal === null) {
          this.usuarioLocal = [];
        } else {
          this.usuario = usuario;
        }
         localStorage.setItem("user", JSON.stringify(usuario));
      }
    },
  },
};
</script>