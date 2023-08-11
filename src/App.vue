<script setup>
import { onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import { useAuthStore } from "./stores/AuthStore";
const authStore = useAuthStore();

onMounted(() => {
  authStore.init();
});
</script>

<template>
  <Navbar />
  <div class="container">
    <RouterView />
  </div>
</template>
