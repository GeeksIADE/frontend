<template>
  <div class="about">
    <center>
      <h1 v-if="isAuthenticated">{{ $t("nav.about-us") }}</h1>
      <h1 v-if="!isAuthenticated">{{ $t("home.welcome") }}</h1>
      <div class="text">
        <p>{{ $t("home.description1") }}</p>
        <p>{{ $t("home.description2") }}</p>

        <p>{{ $t("home.description3") }}</p>
      </div>

    </center>

  </div>
</template>
  
<style>
.text {
  margin-top: 25px;
  font-size: 1.3em;
  padding: 5%;
  border: 2px solid black;
  background-color: white;
  color: black;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 3.6em !important;
  padding-top: 6%;
}
</style>

<script>
export default {
  name: 'HomeView',
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    token() {
      return Cookies.get('token')
    }
  },
}
</script>