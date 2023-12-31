<script setup>
import piniaLogo from "../assets/pinia.svg";

import { ref, onMounted } from "vue";
import TaskDetails from "../components/TaskDetails.vue";
import TaskForm from "../components/TaskForm.vue";
import { useTaskStore } from "../stores/TaskStore.js";
import { useAuthStore } from "../stores/AuthStore.js";

const taskStore = useTaskStore();
const authStore = useAuthStore();

const isLoading = ref(true);
const showWhichtasks = ref("all");

onMounted(async () => {
  await authStore.init();
  await taskStore.getTasksFromFirestore();
  isLoading.value = false;
});
</script>

<template>
  <header>
    <div class="header__content">
      <img
        alt="Pinia logo"
        class="logo"
        :src="piniaLogo"
        width="125"
        height="125" />

      <h1>Pinia tasks</h1>
      <p v-if="authStore.user?.isAnonymous || isLoading">
        Welcome to Pinia Tasks!!
      </p>
      <p v-else>Welcome, {{ authStore.user?.email }}!</p>
      <TaskForm />
    </div>
  </header>

  <main>
    <div class="filter-btn-container">
      <button
        :class="{ 'active-filter': showWhichtasks === 'all' }"
        class="btn"
        @click="showWhichtasks = 'all'">
        All Tasks
      </button>
      <button
        :class="{ 'active-filter': showWhichtasks === 'completed' }"
        class="btn"
        @click="showWhichtasks = 'completed'">
        Completed tasks
      </button>
      <button
        :class="{ 'active-filter': showWhichtasks === 'favorite' }"
        class="btn"
        @click="showWhichtasks = 'favorite'">
        Favorite tasks
      </button>
    </div>

    <div class="task-list-container" v-if="showWhichtasks === 'all'">
      <h2>Your tasks ({{ taskStore.totalTasksCount }})</h2>
      <ul class="task-list task-list--all">
        <li class="message" v-show="taskStore.totalTasksCount === 0">
          <span v-if="taskStore.errorMessage.length">
            {{ taskStore.errorMessage }}
          </span>
          <span v-else-if="isLoading">Loading tasks...</span>
          <span v-else>No tasks... yet</span>
        </li>

        <TaskDetails
          v-for="task in taskStore.tasks"
          :key="task.id"
          :task="task" />
      </ul>
    </div>

    <div class="task-list-container" v-if="showWhichtasks === 'completed'">
      <h2>Completed tasks ({{ taskStore.totalCompletedTasksCount }})</h2>
      <ul class="task-list task-list--completed">
        <li class="message" v-show="taskStore.totalCompletedTasksCount === 0">
          No completed tasks... yet
        </li>
        <TaskDetails
          v-for="task in taskStore.completedTasks"
          :key="task.id"
          :task="task" />
      </ul>
    </div>

    <div class="task-list-container" v-if="showWhichtasks === 'favorite'">
      <h2>Favorite tasks ({{ taskStore.totalFavoriteTasksCount }})</h2>
      <ul class="task-list task-list--favorite">
        <li class="message" v-show="taskStore.totalFavoriteTasksCount === 0">
          No favorite tasks... yet
        </li>
        <TaskDetails
          v-for="task in taskStore.favoriteTasks"
          :key="task.id"
          :task="task" />
      </ul>
    </div>
  </main>
</template>

<style>
.header__content,
main {
  max-width: 120ch;
  margin-inline: auto;
  padding: 2rem;
}

header {
  text-align: center;
  background: var(--color-background-soft);
}

.filter-btn-container {
  outline: 2px solid var(--color-border);
  backdrop-filter: blur(0.5rem);
  position: sticky;
  top: 0.5rem;
  z-index: 2;

  overflow-x: auto;
  display: flex;
  justify-content: flex-start;
}

.filter-btn-container > .btn {
  min-width: max-content;
}

.filter-btn-container > .btn:hover {
  color: var(--color-text-bright);
}

.btn.active-filter {
  background: var(--color-background-mute);
  color: var(--color-text-bright);
}

.task-list {
  margin: 0;
  padding: 0;
  list-style: none;
  min-height: 80vh;
}

.message {
  text-align: center;
  color: var(--color-text-mute);
}
</style>
