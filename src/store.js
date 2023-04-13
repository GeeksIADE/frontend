import Vuex from 'vuex'
import Cookies from 'js-cookie'
import router from './router'
import MapView from './views/MapView.vue';
import HomeView from './views/HomeView.vue';

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        token: null
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
            // const response = await fetch('http://127.0.0.1:7000/api/auth/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ username, password })
            // })
            const response = true;
            commit('setIsAuthenticated', true);
            router.push("/map");
            router.removeRoute("home");
            router.addRoute({ path: '/', name: "home", component: MapView });
            return;

            if (response.ok) {
                const data = await response.json()
                const token = data.token

                // Save the token to state and set isAuthenticated to true
                // commit('setToken', token)
                commit('setIsAuthenticated', true)

                // Save the token to cookies as well
                Cookies.set('token', token, { expires: 7 })

                // Redirect to a new page or do some other action
                this.$router.push('/')
            } else {
                commit('setIsAuthenticated', true)
                const error = await response.text()
            }
        },
        logout({ commit }) {
            // Clear the token and isAuthenticated values in state
            commit('setToken', null);
            commit('setIsAuthenticated', false);

            // Clear the token and isAuthenticated values in cookies as well
            Cookies.remove('token');

            router.removeRoute("home");
            router.addRoute({ path: '/', name: "home", component: HomeView });
            router.push('/login');

        }
    }
})
