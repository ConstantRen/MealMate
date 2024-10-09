// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Ensure this path is correct
import router from './router'; // If you're using Vue Router

const app = createApp(App);
app.use(store); // Use the Vuex store
app.use(router); // Use Vue Router
app.mount('#app');
