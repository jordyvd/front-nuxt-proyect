<template>
  <div>
   <b-row>
      <b-col cols="12" md="6" class="my-2" v-for="(item,index) in 2" :key="index">
        <b-card no-body style="height:300px">
          <b-skeleton-img card-img="top" style="height:100%"></b-skeleton-img>
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