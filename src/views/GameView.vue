<template>
    <div class="games">
        <h1>Games</h1>
        <div class="game-list-container">
            <div class="game-list">
                <div v-for="game in orderedGames" :key="game.id" class="game-item d-flex align-items-center mb-3">
                    <div class="game-name">{{ game.game_name }}&nbsp;&nbsp;</div>
                    <div class="icon-container">
                        <i :class="game.selected ? 'fa fa-minus-circle' : 'fa fa-plus-circle'"
                            @click="toggleGameSelection(game)"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

  
<script>
export default {
    name: 'Games',
    data() {
        return {
            games: [],
        };
    },
    computed: {
        orderedGames() {
            return this.games.sort((a, b) => b.selected - a.selected);
        },
    },
    methods: {
        toggleGameSelection(game) {
            game.selected = !game.selected;
            if (game.selected) {
                console.log(`Adding game: ${game.game_name}`);
            } else {
                console.log(`Removing game: ${game.game_name}`);
            }
        },
    },
    async mounted() {
        try {
            const response = await fetch('http://127.0.0.1:7000/api/games');
            const games = await response.json();
            console.log(games);
            this.games = games.map(game => ({ ...game, selected: false }));
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    },
};
</script>

<style scoped>
.games {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    /* justify-content: center; */
    font-family: Arial, sans-serif;
}

h1 {
    margin-bottom: 20px;
}

.game-list-container {
    width: 60%;
    max-height: 400px;
    /* padding: 20px; */
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    margin-bottom: 20px;
    color: #000;
}

.game-list {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.game-item {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 24px;
}
</style>

