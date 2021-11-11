<script>
module.exports = {
  data() {
    return {
      permiso: [],
      user:[],
    };
  },
  computed: {
    user_name() {
      return "kaka";
    },
    // user_sucursal() {
    //     return user_sucursal.content;
    // },
    // user_rol() {
    //     return user_rol.content;
    // },
    // product_name() {
    //     return "item.nompro";
    // },
    // user_id_sucursal(){
    //     return user_id_sucursal.content;
    // },
    // // ***** permisos *****
    // user_traslado() {
    //     return traslados.content;
    // },
    // user_ventas() {
    //     return ventas.content;
    // },
    // sucursal_ventas() {
    //     return sucursal_ventas.content;
    // },
    // user_reportes() {
    //     return reportes.content;
    // },
    // user_report_ingre(){
    //     return report_ingre.content;
    // },
    // user_report_egre(){
    //     return report_egre.content;
    // },
    // user_ganancias(){
    //     return ganancias.content;
    // },
    // user_clientes() {
    //     return clientes.content;
    // },
    // user_mantenimiento() {
    //     return mantenimiento.content;
    // },
    // user_agregar_modif_mante(){
    //     return agregar_modif_mante.content;
    // },
    // user_almacen(){
    //     return almacen.content;
    // },
    // user_permisos() {
    //     return permisos.content;
    // },
    // user_compras(){
    //     return compras.content;
    // }
  },
  methods: {
    saveLogin(user) {
      if (process.client) {
        // let user = JSON.parse(localStorage.getItem("user"));
        // if (user === null) {
        //   this.user = [];
        // } else {
        //   this.user = user;
        // }
        localStorage.setItem("user", JSON.stringify(user));
        return console.log(user);
      }
    },
  },
};
</script>