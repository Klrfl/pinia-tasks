<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/AuthStore.js";

const signUp = ref(true);
const logIn = ref(false);

function signUpOrLogIn() {
  signUp.value = !signUp.value;
  logIn.value = !logIn.value;
}

const authStore = useAuthStore();

const email = ref("");
const password = ref("");

function handleSignUp() {
  authStore.handleUserSignUp(email.value, password.value);
}

function handleLogIn() {
  authStore.handleUserLogIn(email.value, password.value);
}
</script>

<template>
  <main class="sign-in">
    <h1>
      <span v-show="signUp">Sign Up</span>
      <span v-show="logIn">Log in</span>
    </h1>

    <p>Get to your tasks. Pinia Tasks.</p>

    <!-- sign up form for new users -->
    <div class="sign-up-form-wrapper" v-show="signUp">
      <form class="sign-in-form" @submit.prevent="handleSignUp">
        <label for="email-signup">Email</label>
        <input
          type="email"
          name="email"
          id="email-signup"
          placeholder="email"
          v-model="email"
          required />

        <label for="password-signup">Password</label>
        <input
          type="password"
          name="password"
          id="password-signup"
          placeholder="password"
          v-model="password"
          required />
        <button type="submit">Sign up</button>
      </form>

      <button @click="signUpOrLogIn">Already a user? Log in</button>
    </div>

    <!-- log in for existing users -->
    <div class="log-in-form-wrapper" v-show="logIn">
      <form @submit.prevent="handleLogIn">
        <label for="email-login">Email</label>
        <input
          type="email"
          name="email"
          id="email-login"
          placeholder="email"
          v-model="email"
          required />

        <label for="password-login">Password</label>
        <input
          type="password"
          name="password"
          id="password-login"
          placeholder="password"
          v-model="password"
          required />

        <button type="submit">Log in</button>
      </form>

      <button @click="signUpOrLogIn">New user? Sign up</button>
    </div>
  </main>
</template>

<style>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

form {
  background: var(--color-background-mute);
  padding: 1rem;
}
</style>
