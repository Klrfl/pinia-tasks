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
}
</script>

<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <input type="text" v-model="taskText" />
    <input type="submit" value="Add task" />
  </form>
</template>
