<template>
    <div class="container mt-5">
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
                                <td>{{ room.min_rank }}</td>
                                <td>{{ room.max_rank }}</td>
                                <td>{{ room.max_players }}</td>
                                <td>
                                    <button class="btn btn-primary" @click="joinRoom(room.room_id)">
                                        {{ $t("rooms.join-btn") }}
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
                                    :placeholder='$t("rooms.access-code")' style="width: 150px;">
                                <button type="button" style="margin-bottom: 10px" class="btn btn-primary input-group-append"
                                    @click="joinWithCode">{{ $t("rooms.join-btn") }}</button>
                            </div>
                        </div>
                    </center>

                </div>
            </div>
        </div>
    </div>
</template>
  
<!-- <script>
export default {
    name: "JoinRoom",
    data() {
        return {
            selectedGame: "All",
            searchText: "",
            rooms: [
                {
                    id: 1,
                    title: "Room 1",
                    game: "Overwatch",
                    rank: "Platinum",
                    region: "NA",
                    code: "1234",
                },
                {
                    id: 2,
                    title: "Room 2",
                    game: "League of Legends",
                    rank: "Diamond",
                    region: "EUW",
                    code: "5678",
                },
                {
                    id: 3,
                    title: "Room 3",
                    game: "Counter-Strike: Global Offensive",
                    rank: "Gold Nova",
                    region: "NA",
                    code: "9012",
                },
            ],
            games: [
                "All",
                "Overwatch",
                "League of Legends",
                "Counter-Strike: Global Offensive",
            ],
        };
    },
    computed: {
        filteredRooms() {
            return this.rooms.filter((room) => {
                return (
                    (this.selectedGame === "All" || this.selectedGame === room.game) &&
                    (room.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
                        room.game.toLowerCase().includes(this.searchText.toLowerCase()) ||
                        room.rank.toLowerCase().includes(this.searchText.toLowerCase()) ||
                        room.region.toLowerCase().includes(this.searchText.toLowerCase()))
                );
            });
        },
    },
    methods: {
        joinRoom(code) {
            console.log("Joining room with code: " + code);
        },
    },
};
</script> -->

<script>
import Cookies from 'js-cookie';
export default {
    name: "JoinRoom",
    data() {
        return {
            selectedGame: "All",
            searchText: "",
            rooms: [],
            games: [],
            roomCode: "",
        };
    },
    async created() {
        try {
            const response = await fetch('http://127.0.0.1:7000/api/rooms');
            const data = await response.json();
            this.rooms = data;

            // Fetch game information for each room
            const gameIds = Array.from(new Set(this.rooms.map(room => room.game_id)));
            for (const gameId of gameIds) {
                const gameResponse = await fetch(`http://127.0.0.1:7000/api/games/${gameId}`);
                const gameData = await gameResponse.json();
                const gameName = gameData.game_name;

                // Update the room object with game information
                this.rooms.forEach(room => {
                    if (room.game_id === gameId) {
                        room.game_name = gameName;
                    }
                });
            }

            this.games = ["All", ...new Set(this.rooms.map(room => room.game_name))];
        } catch (err) {
            console.error(err);
        }
    },
    computed: {
        filteredRooms() {
            return this.rooms.filter(room => {
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
        async joinRoom(roomId) {
            try {
                const token = Cookies.get('token');
                const response = await fetch(`http://127.0.0.1:7000/api/rooms/join/${roomId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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
</style>
