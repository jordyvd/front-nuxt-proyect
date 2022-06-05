<template>
  <div class="container">
    <b-row>
      <b-col
        cols="12"
        md="4"
        class="my-2"
        v-for="(item, index) in 9"
        :key="index"
      >
        <b-skeleton-img no-aspect height="200px"></b-skeleton-img>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>