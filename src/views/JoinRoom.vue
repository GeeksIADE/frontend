<template>
  <div class="container mt-5">
    <div v-if="showMembersModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="roomMembersModalLabel">Room Members</h5>
          <button type="button" class="btn-close" @click="closeMembersModal"></button>
        </div>
        <div class="modal-body">
          <ul>
            <li v-for="user in currentRoomMembers" :key="user.id">{{ user.user_name }}</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="closeMembersModal">Close</button>
        </div>
      </div>
    </div>

    <h2>{{ $t("rooms.join") }}</h2>
    <div class="row mt-3">
      <div class="col-md-4">
        <label for="game-filter" class="form-label">{{ $t("rooms.filter-by-game") }}:</label>
        <select id="game-filter" class="form-select" v-model="selectedGame">
          <option v-for="game in games" :value="game">{{ game }}</option>
        </select>
      </div>
      <div class="col-md-8">
        <label for="search" class="form-label">{{ $t("rooms.search-for-rooms") }}:</label>
        <input type="text" id="search" class="form-control" v-model="searchText" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped table-games">
            <thead>
              <tr>
                <th>{{ $t("rooms.title") }}</th>
                <th>{{ $t("rooms.game") }}</th>
                <th>{{ $t("rooms.mode") }}</th>
                <th>{{ $t("rooms.rank_min") }}</th>
                <th>{{ $t("rooms.rank_max") }}</th>
                <th>{{ $t("rooms.max_people") }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="room in filteredRooms" :key="room.id">
                <td>{{ room.room_name }}</td>
                <td>{{ room.game_name }}</td>
                <td>{{ room.mode_name }}</td>
                <td>{{ room.min_rank }}</td>
                <td>{{ room.max_rank }}</td>
                <td>{{ room.max_players }}</td>
                <td>
                  <button v-if="!isUserInRoom(room)" class="btn btn-primary" @click="joinRoom(room.room_id)">
                    {{ $t("rooms.join-btn") }}
                  </button>
                  <button v-else class="btn btn-danger" @click="leaveRoom(room.room_id)">
                    {{ $t("rooms.leave-btn") }}
                  </button>
                  <button v-if="isUserInRoom(room)" class="btn btn-info" @click="viewRoom(room.room_id)">
                    View Room
                  </button>
                  <button class="btn btn-secondary" @click="fetchRoomMembers(room.room_id)">
                    Show Members
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <center>
            <div class="mt-3">
              <label for="roomCode" class="form-label">{{ $t("rooms.join-code") }}</label>
              <div class="input-group mb-3">
                <input type="text" class="form-control" id="roomCode" v-model="roomCode"
                  :placeholder="$t('rooms.access-code')" style="width: 150px;" />
                <button type="button" style="margin-bottom: 10px" class="btn btn-primary input-group-append"
                  @click="joinRoomWithCode(roomCode)">
                  {{ $t("rooms.join-btn") }}
                </button>
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

export default {
  name: "JoinRoom",
  data() {
    return {
      selectedGame: "All",
      searchText: "",
      rooms: [],
      games: [],
      roomCode: "",
      roomMembers: {},
      showMembersModal: false,
      currentUser: null,
      currentRoomMembers: [],
    };
  },
  async created() {
    try {
      const response = await fetch('http://127.0.0.1:7000/api/rooms', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      const data = await response.json();
      console.log(data);
      this.rooms = data;
      // Fetch game and mode information for each room
      for (let room of this.rooms) {
        // Fetch game name
        const gameResponse = await fetch(`http://127.0.0.1:7000/api/games/${room.game_id}`);
        const gameData = await gameResponse.json();
        room.game_name = gameData.game_name;

        // Fetch mode name
        const modeResponse = await fetch(`http://127.0.0.1:7000/api/rooms/${room.mode_id}/mode`);
        const modeData = await modeResponse.json();
        room.mode_name = modeData[0].mode_name;
      }

      this.games = ["All", ...new Set(this.rooms.map((room) => room.game_name))];
      this.games = ["All", ...new Set(this.rooms.map((room) => room.game_name))];
      console.log(this.games);

      const userResponse = await fetch('http://127.0.0.1:7000/api/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      if (userResponse.ok) {
        this.currentUser = await userResponse.json();
      }

      // Fetching the members for each room
      for (let room of this.rooms) {
        await this.fetchRoomMembersOnLoad(room.room_id);
      }

    } catch (err) {
      console.error(err);
    }
  },

  computed: {
    filteredRooms() {
      return this.rooms.filter((room) => {
        return (
          (this.selectedGame === "All" || this.selectedGame === room.game_name) &&
          (room.room_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
            room.game_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
            room.min_rank.toString().includes(this.searchText) ||
            room.max_rank.toString().includes(this.searchText) ||
            room.max_players.toString().includes(this.searchText))
        );
      });
    },
  },
  methods: {

    async joinRoomPrivate(roomCode) {
      try {
        const token = Cookies.get('token');
        const response = await fetch(`http://127.0.0.1:7000/api/rooms/private/${this.roomCode}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        const roomId = response;
        const resp = await response.json();
        console.log("r: " + response.id);

        if (response.ok) {
          console.log('Successfully joined the private room');
          this.$router.push(`/lobby/${roomId}`); // Redirect to the lobby with the room ID
        } else {
          throw new Error('Failed to join the private room');
        }
      } catch (err) {
        console.error(err);
      }
    },
    closeMembersModal() {
      this.showMembersModal = false;
    },
    async fetchRoomMembersOnLoad(roomId) {
      try {
        const token = Cookies.get('token');
        let endpoint = "";
        const integerRoomId = parseInt(roomId, 10);
        console.log(roomId);
        console.log(parseInt(roomId, 10));
        if (isNaN(integerRoomId)) {
          endpoint = `http://127.0.0.1:7000/api/rooms/private/${roomId}/members`;
        }
        else {
          endpoint = `http://127.0.0.1:7000/api/rooms/${roomId}/members`;
        }
        const response = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        // lowxpi5x

        if (response.ok) {
          const data = await response.json();
          this.roomMembers[roomId] = data;
        } else {
          throw new Error('Failed to fetch room members');
        }
      } catch (err) {
        console.error(err);
      }
    },
    async fetchRoomMembers(roomId) {
      try {
        const token = Cookies.get('token');
        let endpoint = "";
        const integerRoomId = parseInt(roomId, 10);
        console.log(isNaN(integerRoomId));
        console.log(integerRoomId.toString() !== roomId);
        if (isNaN(integerRoomId)) {
          endpoint = `http://127.0.0.1:7000/api/rooms/private/${roomId}/members`;
        }
        else {
          endpoint = `http://127.0.0.1:7000/api/rooms/${roomId}/members`;
        }
        const response = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          this.roomMembers[roomId] = data;
          this.currentRoomMembers = data;
          this.showMembersModal = true;
        } else {
          throw new Error('Failed to fetch room members');
        }
      } catch (err) {
        console.error(err);
      }
    },
    isUserInRoom(room) {
      if (!this.currentUser || !this.roomMembers[room.room_id]) {
        return false;
      }
      const userIds = this.roomMembers[room.room_id].map((member) => member.user_id);
      return userIds.includes(this.currentUser.id);
    },
    async joinRoom(roomId) {
      try {
        const token = Cookies.get('token');
        const response = await fetch(`http://127.0.0.1:7000/api/rooms/join/${roomId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });

        if (response.ok) {
          console.log('Successfully joined the room');
          this.$router.push(`/lobby/${roomId}`); // Redirect to the lobby with the room ID
        } else {
          throw new Error('Failed to join the room');
        }
      } catch (err) {
        console.error(err);
      }
    },
    async joinRoomWithCode(roomCode) {
      try {
        const token = Cookies.get('token');
        const response = await fetch(`http://127.0.0.1:7000/api/rooms/private/join/${roomCode}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });

        if (response.ok) {
          console.log('Successfully joined the room');
          this.$router.push(`/lobby/${roomCode}`); // Redirect to the lobby with the room code
        } else {
          throw new Error('Failed to join the room');
        }
      } catch (err) {
        console.error(err);
      }
    },
    async leaveRoom(roomId) {
      try {
        const token = Cookies.get('token');
        const response = await fetch(`http://127.0.0.1:7000/api/rooms/leave/${roomId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });

        if (response.ok) {
          console.log('Successfully left the room');
          // Refresh the room members after leaving the room
          this.fetchRoomMembersOnLoad(roomId);
        } else {
          throw new Error('Failed to leave the room');
        }
      } catch (err) {
        console.error(err);
      }
    },
    viewRoom(roomId) {
      this.$router.push(`/lobby/${roomId}`);
    },
    joinWithCode() {
      this.joinRoom(this.roomCode);
    },
  },
};
</script>
  
<style scoped>
.join-room {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

button {
  width: fit-content;
}

.table-games {
  color: white !important;
}

.table-striped>tbody>tr:nth-of-type(2n+1)>* {
  color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.25rem;
  color: #000;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
}

/* .modal-content {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.25rem;
  color: #000;
} */

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.25rem;
  font-weight: bold;
}

.modal-body {
  margin-top: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-close {
  font-size: 1.5rem;
  color: #000;
  opacity: 0.5;
  transition: opacity 0.15s;
  padding: 0;
}

.btn-close:hover {
  opacity: 1;
}
</style>
  