<template>
  <div>
    <Menu :home="false" />
    <loading v-if="loading" /><br /><br /><br /><br /><br />
    <b-container>
      <b-row>
        <b-col cols="8">
          <b-card class="bg-secondary">
            <b-form>
              <b-row>
                <b-col>
                  <b-form-group
                    id="input-group-2"
                    label="Ruc o dni:"
                    label-for="input-2"
                  >
                    <b-form-input id="input-2" required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="input-group-1"
                    label="Nombre:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      type="text"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group
                    id="input-group-1"
                    label="Direccion:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      type="text"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="input-group-2"
                    label="Telefono:"
                    label-for="input-2"
                  >
                    <b-form-input id="input-2" required></b-form-input>
                  </b-form-group>
                </b-col> </b-row
            ></b-form>
          </b-card>
        </b-col>
        <b-col cols="4">
          <b-card class="bg-secondary"></b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
};
</script>