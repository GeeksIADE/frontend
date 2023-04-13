<template>
  <div class="about">
    <center>
      <h1 v-if="isAuthenticated">About Us</h1>
      <h1 v-if="!isAuthenticated">Welcome to Geeks</h1>
      <div class="text">
        <p>Geeks é uma aplicação para te ajudar a encontrar pessoas com os mesmos gostos que tu</p>
        <p>Conhece novas pessoas e faz novos amigos. Vai ao teu perfil e adiciona os teus jogos favoritos à tua lista para
          todos poderem ver o que preferes.</p>

        <p>Queres jogar em grupo mas falta-te uma pessoa? Junta-te a nós e nunca terás problemas a encontrar alguém
          para
          jogar contigo. Podes criar tu a tua própria sala ou apenas juntar-te a outra para facilitar.</p>
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