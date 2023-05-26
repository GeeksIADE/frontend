<template>
    <div class="games">
        <h1>{{ $t("games.title") }}</h1>
        <div class="game-container">
            <div class="game-list-container">
                <h2>Remaining Games</h2>
                <input type="text" v-model="remainingSearch" placeholder="Search for games" class="search-bar" />
                <div class="game-list">
                    <div v-for="game in filteredRemainingGames" :key="game.game_id"
                        class="game-item d-flex align-items-center mb-3">
                        <div class="game-name">{{ game.game_name }}</div>
                        <div class="icon-container">
                            <i class="fa fa-plus-circle" @click="addGameToUser(game)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="game-list-container">
                <h2>User's Games</h2>
                <input type="text" v-model="userSearch" placeholder="Search for games" class="search-bar" />
                <div class="game-list">
                    <div v-for="game in filteredUserGames" :key="game.game_id"
                        class="game-item d-flex align-items-center mb-3">
                        <div class="game-name">{{ game.game_name }}</div>
                        <div class="icon-container">
                            <i class="fa fa-minus-circle" @click="removeGameFromUser(game)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Cookies from 'js-cookie';

export default {
    name: 'Games',
    data() {
        return {
            games: [],
            user: {
                games: [],
            },
            remainingSearch: '',
            userSearch: '',
        };
    },
    computed: {
        filteredRemainingGames() {
            const remainingGames = this.remainingGames;
            const searchQuery = this.remainingSearch.toLowerCase();
            if (!searchQuery) {
                return remainingGames;
            }
            return remainingGames.filter(game => game.game_name.toLowerCase().includes(searchQuery));
        },
        filteredUserGames() {
            const userGames = this.user.games;
            const searchQuery = this.userSearch.toLowerCase();
            if (!searchQuery) {
                return userGames;
            }
            return userGames.filter(game => game.game_name.toLowerCase().includes(searchQuery));
        },
        remainingGames() {
            const userGameIds = this.user.games.map(game => game.game_id);
            return this.games.filter(game => !userGameIds.includes(game.game_id));
        },
    },
    methods: {
        async fetchUserData() {
            try {
                const token = Cookies.get('token');
                const resp = await fetch('http://127.0.0.1:7000/api/users/games', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (resp.ok) {
                    const data = await resp.json();
                    console.log(data);
                    this.user.games = data; // Update the user's games array
                } else {
                    throw new Error('Failed to fetch user data');
                    // Handle error
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error
            }
        },
        async addGameToUser(game) {
            try {
                const token = Cookies.get('token');
                const response = await fetch('http://127.0.0.1:7000/api/users/games', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        game_id: game.game_id,
                    }),
                });

                if (response.ok) {
                    console.log(`Game ${game.game_name} added to user`);
                    this.user.games.push(game); // Add the game to the user's games array
                } else {
                    throw new Error('Failed to add game to user');
                    // Handle error
                }
            } catch (err) {
                console.error(err);
                // Handle error
            }
        },
        async removeGameFromUser(game) {
            try {
                const token = Cookies.get('token');
                const response = await fetch(`http://127.0.0.1:7000/api/users/games/${game.game_id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    console.log(`Game ${game.game_name} removed from user`);
                    // Remove the game from the user's games array
                    const gameIndex = this.user.games.findIndex(g => g.game_id === game.game_id);
                    if (gameIndex > -1) {
                        this.user.games.splice(gameIndex, 1);
                    }
                } else {
                    throw new Error('Failed to remove game from user');
                    // Handle error
                }
            } catch (err) {
                console.error(err);
                // Handle error
            }
        },
    },
    async mounted() {
        try {
            const response = await fetch('http://127.0.0.1:7000/api/games');
            const games = await response.json();
            console.log(games);
            this.games = games.map(game => ({ ...game, selected: false }));

            await this.fetchUserData();
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

.game-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.game-list-container {
    flex: 1;
    max-height: 400px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    margin-bottom: 20px;
    color: #000;
}

h2 {
    margin: 10px 0;
    text-align: center;
}

.game-list {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.game-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
}

.icon-container {
    cursor: pointer;
}

.fa-plus-circle {
    color: green;
}

.fa-minus-circle {
    color: red;
}

.search-bar {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
}
</style>
  