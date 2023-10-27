<script setup>
import { onMounted, ref } from "vue";
import CTA from "../components/CTA.vue";
import { useAuthStore } from "../stores/AuthStore.js";

const authStore = useAuthStore();

const signUp = ref(true);

function signUpOrLogIn() {
  signUp.value = !signUp.value;
}

const email = ref("");
const password = ref("");

function handleSignUp() {
  authStore.handleUserSignUp(email.value, password.value);
}

function handleLogIn() {
  authStore.handleUserLogIn(email.value, password.value);
}

function handleLogInWithGoogle() {
  authStore.handleUserLogInWithGoogle();
}

function handleSignInWithGoogle() {
  authStore.handleUserSignInWithGoogle();
}

onMounted(async () => {
  await authStore.init();
});
</script>

<template>
  <main class="sign-in">
    <h1>
      <span v-show="signUp">Sign Up</span>
      <span v-show="!signUp">Log in</span>
    </h1>

    <p>Get to your tasks. Pinia Tasks.</p>

    <!-- sign up form for new users -->
    <div class="form-wrapper sign-up-form-wrapper" v-show="signUp">
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
        <CTA type="submit" :center="true" :fill="true">Sign up</CTA>
      </form>

      <CTA @click="handleSignInWithGoogle" :center="true" :fill="true">
        <i class="fa-brands fa-google"></i> Sign up with Google
      </CTA>
    </div>

    <!-- log in for existing users -->
    <div class="form-wrapper log-in-form-wrapper" v-show="!signUp">
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

        <CTA type="submit" :center="true" :fill="true">Log in</CTA>
      </form>
      <CTA @click="handleLogInWithGoogle" :center="true" :fill="true">
        <i class="fa-brands fa-google"></i> Log in with Google
      </CTA>
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

.form-wrapper {
  min-width: 50ch;
}

form {
  background: var(--color-background-mute);
  padding: 1rem 2rem;
}
</style>
