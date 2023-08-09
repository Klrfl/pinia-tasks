<script setup>
import { ref, onMounted } from "vue";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";

import { useTaskStore } from "./stores/TaskStore";
import { useAppThemeStore } from "./stores/AppThemeStore";

const appThemeStore = useAppThemeStore();
const taskStore = useTaskStore();

const appTheme = ref("");
const showWhichtasks = ref("all");

function toggleTheme() {
  appThemeStore.changeTheme(appTheme.value);
  appTheme.value = appThemeStore.theme;

  document.body.setAttribute("data-theme", appTheme.value);
}

onMounted(() => {
  appTheme.value = localStorage.getItem("theme");
  document.body.setAttribute("data-theme", appTheme.value);
  taskStore.getTasksFromFirestore();
});
</script>

<template>
  <header>
    <button class="btn theme-toggle" @click="toggleTheme">
      <i class="material-icons" v-show="appTheme === 'light'"> light_mode </i>
      <i class="material-icons" v-show="appTheme === 'dark'"> dark_mode </i>
    </button>

    <img
      alt="Pinia logo"
      class="logo"
      src="./assets/pinia.svg"
      width="125"
      height="125" />

    <h1>Pinia tasks</h1>
    <p>I'm learning Pinia!!</p>
    <TaskForm></TaskForm>
  </header>

  <main>
    <div class="filter-btn-container">
      <button
        :class="{ 'active-filter': showWhichtasks === 'all' }"
        class="btn btn--cta"
        @click="showWhichtasks = 'all'">
        All Tasks
      </button>
      <button
        :class="{ 'active-filter': showWhichtasks === 'completed' }"
        class="btn btn--cta"
        @click="showWhichtasks = 'completed'">
        Completed tasks
      </button>
      <button
        :class="{ 'active-filter': showWhichtasks === 'favorite' }"
        class="btn btn--cta"
        @click="showWhichtasks = 'favorite'">
        Favorite tasks
      </button>
    </div>

    <ul class="task-list task-list--all" v-show="showWhichtasks === 'all'">
      <h2>Your tasks ({{ taskStore.totalTasksCount }})</h2>
      <TaskDetails
        v-for="task in taskStore.tasks"
        :key="task.id"
        :task="task" />
    </ul>

    <ul
      class="task-list task-list--completed"
      v-show="showWhichtasks === 'completed'">
      <h2>Completed tasks ({{ taskStore.totalCompletedTasksCount }})</h2>
      <p v-if="taskStore.totalCompletedTasksCount === 0">
        No completed tasks... yet
      </p>
      <TaskDetails
        v-for="task in taskStore.completedTasks"
        :key="task.id"
        :task="task" />
    </ul>

    <ul
      class="task-list task-list--favorite"
      v-show="showWhichtasks === 'favorite'">
      <h2>Favorite tasks ({{ taskStore.totalFavoriteTasksCount }})</h2>
      <p v-if="taskStore.totalFavoriteTasksCount === 0">
        No favorite tasks... yet
      </p>
      <TaskDetails
        v-for="task in taskStore.favoriteTasks"
        :key="task.id"
        :task="task" />
    </ul>
  </main>
</template>

<style>
header,
main {
  padding-block: 2rem;
  padding-inline: 0.5rem;
}

header {
  text-align: center;
  background: var(--color-background-soft);
}

main {
  max-width: 85ch;
  margin-inline: auto;
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
  min-height: 80vh;
}

@media (min-width: 40em) {
  header,
  main {
    padding-inline: 2rem;
  }

  .filter-btn-container {
    gap: 0.5rem;
  }
}
</style>
