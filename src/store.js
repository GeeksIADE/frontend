import Vuex from 'vuex'
import Cookies from 'js-cookie'
import router from './router'
import MapView from './views/MapView.vue';
import HomeView from './views/HomeView.vue';
import { Log } from './log';

export default new Vuex.Store({
    state: {
        isAuthenticated: Cookies.get('token') ? true : false,
        token: Cookies.get('token') || null
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setIsAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated
        }
    },
    actions: {
        async login({ commit }, { username, password }) {
            const response = await fetch('http://127.0.0.1:7000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

            if (response.ok) {
                const data = await response.json()
                const token = data.token
                commit('setIsAuthenticated', true)
                Cookies.set('token', token, { expires: 7 })
                Log("Cookies are stored and isAuthenticated is set to true")

                // Change the home route to the map one until user logs out
                router.push("/map");
                router.removeRoute("home");
                router.addRoute({ path: '/', name: "home", component: MapView });

                // Redirect to the home page
                router.push('/')
            } else {
                const error = await response.text()
                Log(error)
            }
        },
        logout({ commit }) {
            commit('setIsAuthenticated', false);

            // Clear the token and isAuthenticated values in cookies as well
            Cookies.remove('token');
            Log("The token has been cleared and isAuthenticated is set to false");

            router.removeRoute("home");
            router.addRoute({ path: '/', name: "home", component: HomeView });
            router.push('/login');

        }
    }
})
