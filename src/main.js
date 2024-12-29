import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';

createApp(App)
  .use(router) // Add the router
  .mount('#app');