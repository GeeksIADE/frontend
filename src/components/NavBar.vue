<template>
    <div class="navbar">
        <div class="logo">
            <picture>
                <router-link to="/"><img src="../assets/geeks.png" alt="logotipo" width="200" /></router-link>
            </picture>
        </div>
        <div class="menu">
            <router-link v-if="isAuthenticated" class="nav-link" to="/about-us">{{ $t("nav.about-us") }}</router-link>
            <div v-if="isAuthenticated" class="dropdown">
                <span class="nav-link dropdown-toggle">{{ $t("nav.rooms") }}</span>
                <div class="dropdown-content">
                    <router-link tag="a" to="/rooms/create" class="dropdown-item">{{ $t("nav.create-room") }}</router-link>
                    <router-link tag="a" to="/rooms/join" class="dropdown-item">{{ $t("nav.join-room") }}</router-link>
                </div>
            </div>
            <router-link v-if="isAuthenticated" class="nav-link" to="/games">{{ $t("nav.games") }}</router-link>
            <ul>
                <li v-if="!isAuthenticated"><router-link to="/login"><button type="button" class="btn btn-primary">{{
                    $t("nav.login") }} / {{
        $t("nav.signup") }}</button></router-link></li>
                <li class="row">
                    <div class="col" style="margin: 0; padding: 0;">
                        <SwitchLanguage></SwitchLanguage>
                    </div>
                    <div class="col box" style="margin: 0; padding: ;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                            class="bi bi-translate" viewBox="0 0 16 16">
                            <path
                                d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                            <path
                                d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
                        </svg>
                        <div class="user-count">
                            <span class="user-count-label">Users: </span>
                            <span v-if="loading">Loading...</span>
                            <span v-else>{{ formattedUserCount }}</span>
                        </div>
                    </div>
                </li>
                <li v-if="isAuthenticated">
                    <UserProfile :profileImage="profileImage" :options="options" />
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import SwitchLanguage from "@/components/SwitchLanguage.vue";
import UserProfile from './UserProfile.vue';
import Cookies from 'js-cookie';

export default {
    name: 'NavBar',
    components: {
        UserProfile,
        SwitchLanguage
    },
    computed: {
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
        token() {
            return Cookies.get('token');
        },
        formattedUserCount() {
            if (typeof this.userCount === 'number') {
                return this.userCount.toLocaleString();
            } else {
                return this.userCount;
            }
        }
    },
    data() {
        return {
            profileImage: '../assets/world.png',
            options: [
                {
                    label: this.$t("nav.show-profile"),
                    action: () => {
                        console.log('Show Profile');
                        this.$router.push('/profile');
                    },
                },
                {
                    label: this.$t("nav.logout"),
                    action: async () => {
                        await this.$store.dispatch('logout');
                        this.$router.push('/');
                    },
                },
            ],
            userCount: null,
            loading: true
        };
    },
    async mounted() {
        try {
            await this.fetchUserCount(); // Fetch user count initially
            setInterval(this.fetchUserCount, 2000); // Fetch user count every 2 seconds
        } catch (error) {
            console.error(error);
            this.userCount = 'N/A';
        } finally {
            this.loading = false;
        }
    },
    methods: {
        async fetchUserCount() {
            const apiUrl = 'http://127.0.0.1:7000/api/users/count';
            const response = await fetch(apiUrl);
            const data = await response.json();
            this.userCount = data.count;
        }
    }
};
</script>
  
<style>
.box {
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

.parent {
    position: fixed;
    top: 0;
    left: 0;
    margin: auto;
    width: 100%;
}

.navbar {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.logo {
    /* padding: 20px; */
}

.menu {
    display: flex;
    align-items: center;
}

.menu ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    list-style: none;
}

.menu li {
    padding: 20px 40px;
    font-size: 18px;
    font-weight: bold;
}

.nav-link {
    padding: 30px !important;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    font-size: 18px;
}

.nav-link:hover {
    color: #f1f1f1;
}

.dropdown {
    position: relative;
    display: inline-block;
    margin-left: 15px;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #2d2d2d;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 5px;
}

.dropdown-content router-link {
    color: #fff;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-weight: normal;
    white-space: nowrap;
}

.dropdown-content router-link:hover {
    background-color: #535353;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown-toggle::after {
    content: "";
    border-top: 5px solid #fff;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    display: inline-block;
    margin-left: 5px;
    vertical-align: middle;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #4b0082;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 10px;
    text-align: center;
    left: 0%;
    top: 70%;
}

.dropdown-item {
    color: #fff;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-weight: normal;
    white-space: nowrap;
    font-size: 16px;
}

.dropdown-item:hover {
    background-color: #6a40a9;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown-content .dropdown-item:hover {
    background-color: #6a40a9;
}

.dropdown-toggle::after {
    content: "";
    border-top: 5px solid #fff;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    display: inline-block;
    margin-left: 5px;
    vertical-align: middle;
}

.user-count {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.user-count-label {
    font-weight: bold;
    margin-right: 5px;
}
</style>