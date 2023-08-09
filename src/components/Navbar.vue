<script setup>
import { ref, onMounted } from "vue";
import { useAppThemeStore } from "../stores/AppThemeStore";

const appThemeStore = useAppThemeStore();
const appTheme = ref("");

function toggleTheme() {
  appThemeStore.changeTheme(appTheme.value);
  appTheme.value = appThemeStore.theme;

  document.body.setAttribute("data-theme", appTheme.value);
}

onMounted(() => {
  appTheme.value = localStorage.getItem("theme");
  document.body.setAttribute("data-theme", appTheme.value);
});
</script>

<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'sign-in' }">Sign in</router-link>

    <button class="btn theme-toggle" @click="toggleTheme">
      <i class="material-icons" v-show="appTheme === 'light'"> light_mode </i>
      <i class="material-icons" v-show="appTheme === 'dark'"> dark_mode </i>
    </button>
  </nav>
</template>

<style>
nav a {
  display: inline-block;
  padding: 1rem;
}

nav a:hover {
  backdrop-filter: invert(0.2);
}
</style>
