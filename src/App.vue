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
    <button class="btn btn--cta" @click="showWhichtasks = 'all'">
      All Tasks
    </button>
    <button class="btn btn--cta" @click="showWhichtasks = 'completed'">
      Completed tasks
    </button>

    <ul class="task-list task-list--all" v-show="showWhichtasks === 'all'">
      <h2>Your tasks ({{ taskStore.totalTasksCount }})</h2>
      <TaskDetails v-for="task in taskStore.tasks" :task="task"></TaskDetails>
    </ul>

    <ul
      class="task-list task-list--done"
      v-show="showWhichtasks === 'completed'">
      <h2>Completed tasks ({{ taskStore.totalCompletedTasksCount }})</h2>
      <p v-if="taskStore.totalCompletedTasksCount === 0">
        No completed tasks... yet
      </p>
      <TaskDetails
        v-for="task in taskStore.completedTasks"
        :task="task"></TaskDetails>
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

.task-list {
  margin: 0;
  padding: 0;
}
</style>
