import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';
import RoomView from '../views/RoomView.vue';
import GameView from '../views/GameView.vue';
import MapView from '../views/MapView.vue';
import CreateRoom from '../views/CreateRoom.vue';
import JoinRoom from '../views/JoinRoom.vue';

const routes = [
  { path: '/', name: "home", component: HomeView },
  { path: '/about-us', component: HomeView },
  { path: '/rooms', component: RoomView },
  { path: '/games', component: GameView },
  { path: '/profile', component: ProfileView },
  { path: '/login', component: LoginView },
  { path: '/map', component: MapView },
  { path: '/rooms/create', component: CreateRoom },
  { path: '/rooms/join', component: JoinRoom },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
