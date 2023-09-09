<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";
import { useAuthStore } from "../stores/AuthStore";

const authStore = useAuthStore();

const taskText = ref("");
const taskStore = useTaskStore();

const randomTasks = [
  "Complete the JavaScript course",
  "Read a book",
  "Go for a run",
  "Buy groceries",
  "Clean the house",
  "Write a blog post",
  "Practice playing the guitar",
  "Attend a meetup",
  "Learn a new recipe",
  "Organize files on the computer",
  "Call a friend",
  "Start a new project",
  "Watch a movie",
  "Create a presentation",
  "Take a break and relax",
  "Practice mindfulness meditation",
  "Volunteer for a local charity",
  "Visit a museum",
  "Learn a new language",
  "Play a board game",
];

function handleSubmit() {
  if (taskText.value.length === 0) {
    alert("Please type in something.");
    return;
  }

  taskStore.addTask(authStore.user.uid, {
    text: taskText.value,
    isDone: false,
    isfav: false,
  });

  taskText.value = "";
}

function getRandomTask() {
  const randomIndex = Math.floor(Math.random() * randomTasks.length);
  return randomTasks[randomIndex];
}
</script>

<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <input class="task-form__text" type="text" :placeholder="getRandomTask()" v-model="taskText" />
    <input class="task-form__submit" type="submit" value="Add task" />
  </form>
</template>

<style>
.task-form {
  max-width: 85ch;
  margin-inline: auto;
  padding: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.task-form>* {
  border: none;
  background: transparent;
  color: var(--color-text);
  padding: 1rem;
}

.task-form__text {
  border: 2px solid var(--color-border);
  background: var(--color-background-soft);
  flex-grow: 8;
  max-width: 75ch;
}

.task-form__submit {
  flex-grow: 1;
  outline: 2px solid var(--accent);
  cursor: pointer;
}
</style>
