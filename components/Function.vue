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
     agregarFavoritos(item){
        axios.post('')
     }
  },
};
</script>