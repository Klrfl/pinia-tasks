<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";
import { useAuthStore } from "../stores/AuthStore";
import CTA from "./CTA.vue";

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
    <input
      class="task-form__text"
      type="text"
      :placeholder="getRandomTask()"
      v-model="taskText" />
    <!-- <input class="task-form__submit" type="submit" value="Add task" /> -->
    <CTA :center="true" class="task-form__submit">Add task</CTA>
  </form>
</template>

<style>
.task-form {
  max-width: 120ch;
  margin-inline: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.task-form > * {
  border: none;
  background: transparent;
  color: var(--color-text);
  padding: 1rem;
}

.task-form__text {
  border: 2px solid var(--color-border);
  background: var(--color-background-soft);
  flex-grow: 7;
  text-align: left;
}

.task-form__submit {
  outline: 2px solid var(--accent);
  margin: 0;
  min-width: max-content;
  cursor: pointer;
}

@media screen and (max-width: 40em) {
  .task-form {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
