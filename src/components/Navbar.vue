<script setup>
import { ref, onMounted } from "vue";
import CTA from "./CTA.vue";
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

const userPopup = ref(null);
function toggleUserPopup() {
  userPopup.value.classList.toggle("active");
}

async function signOut() {
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
      <router-link class="btn" :to="{ name: 'home' }">Home</router-link>
      <router-link
        class="btn"
        :to="{ name: 'sign-in' }"
        v-if="!authStore.isLoggedIn">
        Sign in
      </router-link>
    </div>

    <div class="nav-buttons">
      <button class="btn theme-toggle" @click="toggleTheme">
        <i class="material-icons" v-if="appTheme === 'light'"> light_mode </i>
        <i class="material-icons" v-if="appTheme === 'dark'"> dark_mode </i>
      </button>

      <button
        class="btn nav-user-info"
        @click="toggleUserPopup"
        v-if="authStore.isLoggedIn">
        <i class="material-icons">person</i>

        <div class="user-popup" ref="userPopup">
          <p>Signed in as {{ authStore.user.email }}</p>
          <CTA :center="true" :fill="true" @click="signOut">Sign out</CTA>
        </div>
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
}

nav a:hover {
  backdrop-filter: invert(0.2);
}

.nav-links,
.nav-buttons {
  display: flex;
}

.nav-user-info {
  position: relative;
}

.user-popup {
  background: var(--color-background);
  padding: 1rem;
  display: none;
  position: absolute;
  top: 100%;
  right: 1rem;
  min-width: max-content;
}

.user-popup.active {
  display: block;
}
</style>
