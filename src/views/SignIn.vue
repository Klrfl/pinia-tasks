<script setup>
import { ref } from "vue";
import CTA from "../components/CTA.vue";
import { useAuthStore } from "../stores/AuthStore.js";

const signUp = ref(true);

function signUpOrLogIn() {
  signUp.value = !signUp.value;
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
      <span v-show="!signUp">Log in</span>
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
        <CTA type="submit" class="btn--submit">Sign up</CTA>
      </form>
    </div>

    <!-- log in for existing users -->
    <div class="log-in-form-wrapper" v-show="!signUp">
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

        <CTA type="submit" class="btn--submit">Log in</CTA>
      </form>
    </div>

    <CTA @click="signUpOrLogIn">
      <span v-show="!signUp">New to Pinia Tasks? Sign up for an account</span>
      <span v-show="signUp">Already a user? Log in instead</span>
    </CTA>

    <p class="error" v-if="authStore.errorMessage.length !== 0">
      {{ authStore.errorMessage }}
    </p>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

form {
  background: var(--color-background-mute);
  padding: 1rem 2rem;
}

form > .btn--submit {
  width: 100%;
  text-align: center;
  color: var(--vt-c-accent);
}
</style>
