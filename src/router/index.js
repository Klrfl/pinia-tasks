import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: HomeView,
  },
  {
    name: "sign-in",
    path: "/sign-in",
    component: () => import("../views/SignInView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
