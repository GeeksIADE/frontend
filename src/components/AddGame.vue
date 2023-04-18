<template>
    <div>
        <h2>{{ $t("games.add-to-list") }}</h2>
        <form @submit.prevent="addGame">
            <div class="form-group">
                <label for="game-name">{{ $t("games.name") }}</label>
                <input type="text" id="game-name" v-model="newGameName" class="form-control">
            </div>
            <div class="form-group">
                <label for="game-platform">{{ $t("games.platform") }}:</label>
                <select id="game-platform" v-model="newGamePlatform" class="form-control">
                    <option value="pc">PC</option>
                    <option value="xbox">Xbox</option>
                    <option value="playstation">PlayStation</option>
                </select>
            </div>
            <button class="btn btn-primary">{{ $t("games.add") }}</button>
        </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            newGameName: '',
            newGamePlatform: 'pc'
        };
    },
    methods: {
        addGame() {
            // Add the new game to the user's playing list
            const newGame = {
                name: this.newGameName,
                platform: this.newGamePlatform
            };
            this.$store.dispatch('addGameToPlayingList', newGame);

            // Clear the input fields
            this.newGameName = '';
            this.newGamePlatform = 'pc';
        }
    }
};
</script>