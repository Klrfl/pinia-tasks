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
  if (authStore.isLoggedIn) {
    userPopup.value.classList.toggle("active");
  }
}

async function signOut() {
  try {
    await authStore.handleSignUserOut();
  } catch (err) {
    alert(err.message);
    console.error(err.message);
  }
}

const deleteAccountDialog = ref(null);

function openDeleteAccountDialog() {
  deleteAccountDialog.value.showModal();
}

function deleteAccount() {
  const returnValue = deleteAccountDialog.value.returnValue;
  if (returnValue == "default") deleteAccountDialog.value.close();
  else console.log("deleting account...");
}
</script>

<template>
  <nav>
    <div class="nav-links">
      <router-link class="btn" :to="{ name: 'home' }">Home</router-link>
      <router-link
        class="btn"
        :to="{ name: 'sign-in' }"
        v-if="!authStore.isLoggedIn"
      >
        Sign in
      </router-link>
    </div>

    <div class="nav-buttons">
      <button class="btn theme-toggle" @click="toggleTheme">
        <i class="fa-solid fa-sun" v-if="appTheme === 'light'"></i>
        <i class="fa-solid fa-moon" v-if="appTheme === 'dark'"></i>
      </button>

      <button
        class="btn nav-user-info"
        @click="toggleUserPopup"
        v-if="authStore.isLoggedIn"
      >
        <i class="fa-solid fa-user"></i>
        <div class="user-popup" ref="userPopup">
          <p>Signed in as {{ authStore.user?.email }}</p>
          <CTA :center="true" :fill="true" @click="signOut">Sign out</CTA>
          <CTA :center="true" :fill="true" @click="openDeleteAccountDialog">
            Delete account
          </CTA>
        </div>
      </button>

      <dialog
        ref="deleteAccountDialog"
        class="delete-account-dialog"
        @close="deleteAccount"
      >
        <form method="dialog">
          <h1>THIS ACTION IS IRREVERSIBLE!</h1>
          <p>
            Are you sure you want to delete your account?
            <strong> Your tasks will be deleted too. </strong>
          </p>

          <CTA :fill="true" value="delete-account">Yes i am sure</CTA>
          <CTA :fill="true" value="default" autofocus>Nah nevermind</CTA>
        </form>
      </dialog>
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

.delete-account-dialog {
  border: 2px solid var(--color-border);
  margin: auto;
  padding: 2rem;
  background: var(--color-background);
  color: inherit;
  text-align: center;
  max-width: 75ch;
}

.delete-account-dialog::backdrop {
  backdrop-filter: blur(0.5rem);
}
</style>
