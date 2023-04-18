<template>
    <div class="container create-room">
        <h2>{{ $t("create-room.title") }}</h2>
        <form @submit.prevent="createRoom">
            <div class="mb-3">
                <label for="roomTitle" class="form-label">{{ $t("create-room.room-title") }}</label>
                <input type="text" class="form-control" id="roomTitle" v-model="roomTitle"
                    :placeholder='$t("create-room.room-title")' required>
            </div>
            <div class="mb-3">
                <label for="gameName" class="form-label">{{ $t("create-room.game-name") }}</label>
                <input type="text" class="form-control" id="gameName" v-model="gameName"
                    :placeholder='$t("create-room.game-name")' required>
            </div>
            <div class="mb-3">
                <label for="roomRank" class="form-label">Rank</label>
                <input type="number" class="form-control" id="roomRank" v-model="roomRank" placeholder="Rank" required>
            </div>
            <button type="submit" class="btn btn-primary">{{ $t("create-room.create") }}</button>
        </form>
    </div>
</template>
  
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
  