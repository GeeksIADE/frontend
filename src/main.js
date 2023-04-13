import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './translations';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import './assets/main.css';
import store from './store'


const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(store);

export const eventBus = app;

app.mount('#app');
