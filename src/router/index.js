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

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn && to.name !== "sign-in") {
    return { name: "sign-in" };
  }
});

export default router;
