<script setup>
import { ref } from "vue";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore";

const taskStore = useTaskStore();

const showWhichtasks = ref("all");
</script>

<template>
  <header>
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
      <TaskDetails v-for="task in taskStore.tasks" :task="task" />
    </ul>

    <ul
      class="task-list task-list--completed"
      v-show="showWhichtasks === 'completed'">
      <h2>Completed tasks ({{ taskStore.totalCompletedTasksCount }})</h2>
      <p v-if="taskStore.totalCompletedTasksCount === 0">
        No completed tasks... yet
      </p>
      <TaskDetails v-for="task in taskStore.completedTasks" :task="task" />
    </ul>

    <ul
      class="task-list task-list--favorite"
      v-show="showWhichtasks === 'favorite'">
      <h2>Completed tasks ({{ taskStore.totalFavoriteTasksCount }})</h2>
      <p v-if="taskStore.totalFavoriteTasksCount === 0">
        No favorite tasks... yet
      </p>
      <TaskDetails v-for="task in taskStore.favoriteTasks" :task="task" />
    </ul>
  </main>
</template>

<style>
header {
  text-align: center;
}

main {
  max-width: 75ch;
  margin-inline: auto;
}

.filter-btn-container {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn.active-filter {
  backdrop-filter: invert(0.2);
}

.task-list {
  margin: 0;
  padding: 0;
}
</style>
