<script setup>
import WorldMap from '../components/WorldMap.vue';
import AddGame from '../components/AddGame.vue';
</script>

<template>
  <center>
    <div class="title">
      <WorldMap></WorldMap>
    </div>
  </center>
</template>

<script>
export default {
  data() {
    return {
      showAddGameModal: false,
    };
  },
  methods: {
    addGame() {
      this.showAddGameModal = true;
    },
    createRoom() {
      //todo Implement create room functionality
    },
    viewRooms() {
      //todo Implement view rooms functionality
    },
  },
  components: {
    WorldMap,
    AddGame,
  },
};
</script>

<style scoped>
.title {
  height: 10hv;
}

button {
  margin-right: 5%;
}
</style>
