<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="wrapper">
    <div class="row">
      <NavBar />
    </div>
    <div class="row">
      <RouterView />
    </div>
  </div>
</template>