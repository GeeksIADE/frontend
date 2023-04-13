<template>
    <div class="container mt-5">
        <h2>Join a Room</h2>
        <div class="row mt-3">
            <div class="col-md-4">
                <label for="game-filter" class="form-label">Filter by game:</label>
                <select id="game-filter" class="form-select" v-model="selectedGame">
                    <option v-for="game in games" :value="game">{{ game }}</option>
                </select>
            </div>
            <div class="col-md-8">
                <label for="search" class="form-label">Search for rooms:</label>
                <input type="text" id="search" class="form-control" v-model="searchText" />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-striped table-games">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Game</th>
                                <th>Rank</th>
                                <th>Region</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="room in filteredRooms" :key="room.id">
                                <td>{{ room.title }}</td>
                                <td>{{ room.game }}</td>
                                <td>{{ room.rank }}</td>
                                <td>{{ room.region }}</td>
                                <td>
                                    <button class="btn btn-primary" @click="joinRoom(room.code)">
                                        Join
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <center>
                        <div class="mt-3">
                            <label for="roomCode" class="form-label">Join with a Code</label>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" id="roomCode" v-model="roomCode"
                                    placeholder="Enter room code" style="width: 150px;">
                                <button type="button" style="margin-bottom: 10px" class="btn btn-primary input-group-append"
                                    @click="joinWithCode">Join</button>
                            </div>
                        </div>
                    </center>

                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
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
