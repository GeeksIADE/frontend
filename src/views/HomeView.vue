<script setup>
import WorldMap from '../components/WorldMap.vue';
</script>

<template>
  <center>
    <div class="title">
      <h1>{{ $t("home.text") }}</h1>
      <br>
      <WorldMap></WorldMap>

    </div>
  </center>
</template>

<style>
.title {
  margin-top: 10%;
}
</style>