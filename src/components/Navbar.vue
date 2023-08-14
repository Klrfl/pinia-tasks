<script setup>
import { ref, onMounted } from "vue";
import { useAppThemeStore } from "../stores/AppThemeStore";
import { useAuthStore } from "../stores/AuthStore";

// app theme
const appThemeStore = useAppThemeStore();
const appTheme = ref("");
const authStore = useAuthStore();

function toggleTheme() {
  appThemeStore.changeTheme(appTheme.value);
  appTheme.value = appThemeStore.theme;

  document.body.setAttribute("data-theme", appTheme.value);
}

onMounted(() => {
  appTheme.value = localStorage.getItem("theme");
  document.body.setAttribute("data-theme", appTheme.value);
});

async function logOut() {
  try {
    await authStore.handleSignUserOut();
  } catch (err) {
    alert(err.message);
    console.error(err.message);
  }
}
</script>

<template>
  <nav>
    <div class="nav-links">
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'sign-in' }" v-if="!authStore.isLoggedIn">
        Sign in
      </router-link>
    </div>

    <div class="nav-buttons">
      <button class="btn theme-toggle" @click="toggleTheme">
        <i class="material-icons" v-if="appTheme === 'light'"> light_mode </i>
        <i class="material-icons" v-if="appTheme === 'dark'"> dark_mode </i>
      </button>

      <button @click="logOut" v-if="authStore.isLoggedIn">
        {{ authStore.user.email }} Sign out
      </button>
    </div>
  </nav>
</template>

<style>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  display: inline-block;
  padding: 1rem;
}

nav a:hover {
  backdrop-filter: invert(0.2);
}

.nav-buttons {
  display: flex;
}
</style>
