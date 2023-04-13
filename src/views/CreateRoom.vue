<template>
    <div class="container create-room">
        <h2>Create Room</h2>
        <form @submit.prevent="createRoom">
            <div class="mb-3">
                <label for="roomTitle" class="form-label">Room Title</label>
                <input type="text" class="form-control" id="roomTitle" v-model="roomTitle" placeholder="Enter room title"
                    required>
            </div>
            <div class="mb-3">
                <label for="gameName" class="form-label">Game Name</label>
                <input type="text" class="form-control" id="gameName" v-model="gameName" placeholder="Enter game name"
                    required>
            </div>
            <div class="mb-3">
                <label for="roomRank" class="form-label">Rank</label>
                <input type="number" class="form-control" id="roomRank" v-model="roomRank" placeholder="Enter rank"
                    required>
            </div>
            <button type="submit" class="btn btn-primary">Create Room</button>
        </form>
    </div>
</template>
  
  <!-- ...existing script and style blocks -->
  
  
<script>
export default {
    data() {
        return {
            title: "",
            gameName: "",
            rank: "",
        };
    },
    methods: {
        createRoom() {
            console.log("Creating room with the following data:");
            console.log("Title:", this.title);
            console.log("Game Name:", this.gameName);
            console.log("Rank:", this.rank);

            //todo Implement the logic to create a room
        },
    },
};
</script>
  
<style scoped>
.create-room {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-container {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-top: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

label,
input {
    margin-bottom: 10px;
}

button {
    width: fit-content;
    align-self: center;
    margin-top: 20px;
}
</style>
  