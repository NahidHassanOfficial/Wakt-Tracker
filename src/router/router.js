import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Setting from "../components/Setting.vue";
import App from "../components/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: App,
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
  },
];

let router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
