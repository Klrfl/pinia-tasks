<script setup>
import { useTaskStore } from "../stores/TaskStore";

const props = defineProps({
  task: Object,
});

const taskStore = useTaskStore();
</script>

<template>
  <li class="task">
    <p class="task__text">
      {{ task.text }}
    </p>
    <div class="task__btn-container">
      <button
        class="btn task__delete-btn"
        @click="taskStore.deleteTask(task.id)">
        <i class="material-icons">delete</i>
      </button>

      <button
        class="btn task__done-btn"
        @click="taskStore.completeTask(task.id)">
        <i class="material-icons">done</i>
      </button>

      <button
        class="btn task__favorite-btn"
        @click="taskStore.favTask(task.id)">
        <i class="material-icons">favorite</i>
      </button>
    </div>
  </li>
</template>

<style>
.task {
  list-style: none;
  outline: 2px solid var(--color-border);

  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.task__text {
  padding: 1em;
  flex-grow: 1;
}

.task__btn-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.task .btn {
  background: var(--vt-c-accent);
  padding: 0.5em;
}
</style>
