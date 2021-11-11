<template>
  <div class="container">
    <b-row>
      <b-col cols="12" md="4" class="my-2" v-for="(item,index) in 9" :key="index">
        <b-card no-body style="height:200px">
          <b-skeleton-img card-img="top" aspect="3:1" style="height:100px!important"></b-skeleton-img>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>