<template>
  <div class="container text-center">
    <div v-if="roomCreated" class="alert alert-success mt-2">
      Room has been created successfully!
      Room Code: <span ref="roomCode">{{ createdRoomCode }}</span>
      <button @click="copyToClipboard" class="btn btn-secondary btn-sm ml-2">Copy Code</button>
      <div v-if="copied" class="mt-2 text-success">
        Code copied to clipboard!
      </div>
    </div>
    <form @submit.prevent="createRoom" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="room-name" class="form-label">Room Name:</label>
        <input id="room-name" type="text" v-model="roomName" class="form-control" required
          style="width:50%; margin: auto;">
        <div class="invalid-feedback">
          Please provide a room name.
        </div>
      </div>

      <div class="mb-3">
        <label for="game-selector" class="form-label">Game:</label>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="game-selector" data-bs-toggle="dropdown"
            aria-expanded="false">
            {{ selectedGame.game_name || "Select a Game" }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="game-selector">
            <li v-for="game in games" :key="game.game_id">
              <a class="dropdown-item" href="#" @click.prevent="selectGame(game)">{{ game.game_name }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mb-3" v-if="selectedGame.game_name">
        <label for="mode-selector" class="form-label">Mode:</label>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="mode-selector" data-bs-toggle="dropdown"
            aria-expanded="false">
            {{ selectedMode.mode_name || "Select a Mode" }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="mode-selector">
            <li v-for="mode in modes" :key="mode.mode_id">
              <a class="dropdown-item" href="#" @click.prevent="selectMode(mode)">{{ mode.mode_name }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mb-3">
        <label for="max-players" class="form-label">Max Players:</label>
        <input id="max-players" type="range" v-model="maxPlayers" min="1" max="10" class="form-control-range"
          style="width:50%; margin: auto;">
        <div>{{ maxPlayers }}</div>
      </div>

      <div class="mb-3">
        <label for="min-rank" class="form-label">Minimum Rank:</label>
        <input id="min-rank" type="text" v-model="minRank" class="form-control" style="width:50%; margin: auto;">
      </div>

      <div class="mb-3">
        <label for="max-rank" class="form-label">Maximum Rank:</label>
        <input id="max-rank" type="text" v-model="maxRank" class="form-control" style="width:50%; margin: auto;">
      </div>


      <div class="mb-3">
        <label for="private-check" class="form-check-label">Make Private:</label>
        <input id="private-check" type="checkbox" class="form-check-input" v-model="isPrivate">
      </div>

      <div class="mb-3" v-if="isPrivate">
        <label for="access-code" class="form-label">Access Code:</label>
        <input id="access-code" type="text" class="form-control" v-model="accessCode" readonly>
      </div>

      <button type="submit" class="btn btn-primary">Create Room</button>
    </form>
  </div>
</template>
  
<script>
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      roomName: '',
      maxPlayers: 1,
      minRank: '',
      maxRank: '',
      games: [],
      selectedGame: {},
      modes: [],
      selectedMode: {},
      isPrivate: false,
      accessCode: '',
      roomCreated: false,
      createdRoomCode: '',
      copied: false,
    };
  },
  watch: {
    selectedGame: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchModes(newVal.game_id);
      }
    },
    isPrivate: function (newVal, oldVal) {
      if (newVal && !oldVal) {
        this.accessCode = this.generateAccessCode();
      } else if (!newVal && oldVal) {
        this.accessCode = '';
      }
    },
  },
  mounted() {
    this.fetchGames();
  },
  methods: {
    async fetchGames() {
      const token = Cookies.get('token');
      const res = await fetch('http://127.0.0.1:7000/api/games', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      this.games = data;
    },
    async fetchModes(gameId) {
      const token = Cookies.get('token');
      const res = await fetch(`http://127.0.0.1:7000/api/games/${gameId}/modes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      this.modes = data;
    },
    selectGame(game) {
      this.selectedGame = game;
    },

    selectMode(mode) {
      this.selectedMode = mode;
    },
    generateAccessCode() {
      return Math.random().toString(36).substring(2, 10);
    },
    copyToClipboard() {
      const el = this.$refs.roomCode;
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(el);
      selection.removeAllRanges();
      selection.addRange(range);
      const successful = document.execCommand('copy');
      if (successful) {
        this.copied = true;
        setTimeout(() => this.copied = false, 3000);
      } else {
        alert('Unable to copy!');
      }
      selection.removeAllRanges();
    },
    async createRoom() {
      const token = Cookies.get('token');
      const response = await fetch('http://127.0.0.1:7000/api/rooms/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.roomName,
          max_players: this.maxPlayers,
          min_rank: this.minRank,
          max_rank: this.maxRank,
          game_id: this.selectedGame.game_id,
          mode_id: this.selectedMode.mode_id,
          is_private: this.isPrivate,
          access_code: this.accessCode,
        }),
      });
      if (response.ok) {
        this.roomCreated = true;
        this.createdRoomCode = this.accessCode;
      }
      this.roomName = '';
      this.selectedGame = {};
      this.selectedMode = {};
      this.modes = [];
      this.isPrivate = false;
      this.accessCode = '';
    },
  },
};
</script>
