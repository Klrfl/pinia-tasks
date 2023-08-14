import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { useAuthStore } from "../stores/AuthStore";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "sign-in",
    path: "/sign-in",
    component: () => import("../views/SignIn.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
