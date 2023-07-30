<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";

const taskText = ref("");
const taskStore = useTaskStore();

function handleSubmit() {
  if (taskText.value.length === 0) {
    alert("Please type in something.");
    return;
  }

  taskStore.addTask({
    id: Date.now(),
    text: taskText.value,
    isDone: false,
    isfav: false,
  });

  taskText.value = "";
}
</script>

<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <input type="text" v-model="taskText" />
    <input type="submit" value="Add task" />
  </form>
</template>

<style>
.task-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.task-form > * {
  padding: 1rem;
}
</style>
