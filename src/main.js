import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Router from "./router/index.js";

createApp(App).use(Router).mount("#app");
