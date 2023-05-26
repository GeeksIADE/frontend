<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="card">
                    <div class="card-body text-center">
                        <img :src="profileImageUrl" alt="Profile Image" class="img-fluid rounded-circle mb-3"
                            style="width: 150px; height: 150px; object-fit: cover;" />
                        <h1 class="h4 mb-0">{{ user.name }}</h1>
                        <p class="text-muted">{{ user.email }}</p>
                        <div class="btn-group" role="group" aria-label="Profile Actions">
                            <button class="btn btn-primary" @click="editProfile()">Edit</button>
                            <button class="btn btn-secondary" @click="changePassword()">Change Password</button>
                            <button class="btn btn-secondary" @click="setupTwoFactorAuth()">Set up 2FA</button>
                            <button class="btn btn-danger" @click="logout()">Logout</button>
                        </div>
                    </div>
                </div>

                <div class="card mt-3">
                    <div class="card-body">
                        <div v-if="editing">
                            <form @submit.prevent="saveProfile()">
                                <div class="form-group">
                                    <label for="name"><strong>Name:</strong></label>
                                    <input type="text" id="name" v-model="user.name" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="email"><strong>Email:</strong></label>
                                    <input type="email" id="email" v-model="user.email" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="profile-image">Profile Image:</label>
                                    <input type="file" id="profile-image" @change="handleProfileImageChange" />
                                </div>
                                <button class="btn btn-primary">Save</button>
                            </form>
                        </div>

                        <div v-if="changingPassword">
                            <form @submit.prevent="savePassword()">
                                <div class="form-group">
                                    <label for="current-password"><strong>Current Password:</strong></label>
                                    <input type="password" id="current-password" v-model="passwords.currentPassword"
                                        class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="new-password"><strong>New Password:</strong></label>
                                    <input type="password" id="new-password" v-model="passwords.newPassword"
                                        class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="confirm-password"><strong>Confirm Password:</strong></label>
                                    <input type="password" id="confirm-password" v-model="passwords.confirmPassword"
                                        class="form-control" />
                                </div>
                                <button class="btn btn-primary">Save</button>
                            </form>
                        </div>

                        <div v-else>
                            <div class="form-group">
                                <label for="name"><strong>Name:</strong></label>
                                <div class="profile-data">{{ user.name }}</div>
                            </div>
                            <div class="form-group">
                                <label for="email"><strong>Email:</strong></label>
                                <div class="profile-data">{{ user.email }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mt-3">
                    <div class="card-body">
                        <h3>My Games</h3>
                        <ul>
                            <li v-for="game in user.games" :key="game.game_id" class="game-item">
                                {{ game.game_name }}
                                <button class="btn btn-danger" @click="removeGameFromUser(game)">Remove</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            editing: false,
            changingPassword: false,
            user: {
                name: '',
                email: '',
                profileImageUrl: '../assets/avatar.png',
                games: [],
            },
            profileImageFile: null,
            passwords: {
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            },
        };
    },
    async created() {
        await this.fetchUserData();
    },
    computed: {
        profileImageUrl() {
            return this.profileImageFile ? URL.createObjectURL(this.profileImageFile) : this.user.profileImageUrl;
        },
    },
    methods: {
        async fetchUserData() {
            try {
                const token = Cookies.get('token');
                const resp = await fetch('http://127.0.0.1:7000/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await resp.json();

                this.user.name = data.first_name + ' ' + data.last_name;
                this.user.email = data.email;
                this.user.profileImageUrl = data.profileImageUrl;
                this.user.games = data.games;
            } catch (error) {
                console.error('Error fetching user data:', error);
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
                    const index = this.user.games.findIndex((g) => g.game_id === game.game_id);
                    if (index !== -1) {
                        this.user.games.splice(index, 1);
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

        editProfile() {
            this.editing = true;
        },
        saveProfile() {
            //todo Save the user's profile changes
            this.editing = false;
        },
        handleProfileImageChange(event) {
            this.profileImageFile = event.target.files[0];
        },
        changePassword() {
            this.changingPassword = true; // True means showing the change password form
        },
        setupTwoFactorAuth() {
            //todo Show the 2FA setup form
        },
        logout() {
            this.$store.dispatch('logout');
        },
    },
};
</script>
  
<style scoped>
.card {
    background-color: #333333;
    color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    margin: 20px;
    overflow: hidden;
}

.card-header {
    background-color: #8bc34a;
    color: #ffffff;
    padding: 20px;
}

.card-header h2 {
    font-size: 24px;
    margin: 0;
}

.card-body {
    padding: 20px;
}

.form-group {
    display: block;
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 18px;
}

.form-group input[type='text'],
.form-group input[type='email'] {
    background-color: #ffffff;
    border-radius: 3px;
    border: none;
    display: block;
    font-size: 16px;
    padding: 10px;
    width: 100%;
}

.form-group.form-group-inline {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
}

.form-group.form-group-inline:last-child {
    margin-right: 0;
}

.profile-data {
    font-size: 18px;
    padding-top: 5px;
}

.game-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
</style>
  