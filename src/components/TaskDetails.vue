<script setup>
import { useTaskStore } from "../stores/TaskStore";

const props = defineProps({
  task: Object,
});

const taskStore = useTaskStore();
</script>

<template>
  <li :class="{ 'task--complete': task.isDone }" class="task">
    <button
      :class="{ 'task__favorite-btn--complete': task.isDone }"
      class="btn task__done-btn"
      @click="taskStore.completeTask(task.id)">
      <i class="material-icons">done</i>
    </button>

    <p class="task__text">
      {{ task.text }}
    </p>

    <button class="btn task__delete-btn" @click="taskStore.deleteTask(task.id)">
      <i class="material-icons">delete</i>
    </button>

    <button
      :class="{ 'task__favorite-btn--fav': task.isFav }"
      class="btn task__favorite-btn"
      @click="taskStore.favTask(task.id)">
      <i class="material-icons">favorite</i>
    </button>
  </li>
</template>

<style>
.task {
  list-style: none;
  outline: 2px solid var(--color-border);
  margin-block-end: 0.5rem;

  display: flex;
  align-items: center;

  position: relative;
}

.task--complete {
  text-decoration: line-through;
}

.task::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 0.25rem;
  transition: background-color 250ms ease;
}

.task--complete::before {
  background: var(--vt-c-accent);
}

.task__text {
  padding: 1em;
  margin: 0;
  flex-grow: 1;
}

.task .btn {
  padding: 1em;
  transition: color 0.4s ease;
}

.task__favorite-btn--complete {
  color: var(--vt-c-accent);
}

.task__favorite-btn--fav {
  color: var(--vt-c-green);
}
</style>
