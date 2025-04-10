import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Home from "./views/Home.vue";
import PokemonDetails from "./views/PokemonDetails.vue";

const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/pokemon/:id", component: PokemonDetails }
  ],
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
