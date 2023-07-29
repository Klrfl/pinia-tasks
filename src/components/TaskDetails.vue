<script setup>
const props = defineProps({
  task: Object,
});
</script>

<template>
  <li class="task">
    <p class="task__text">
      {{ task.text }}
    </p>
    <button class="btn task__delete-btn">
      <i class="material-icons">delete</i>
    </button>
    <button class="btn task__favorite-btn">
      <i class="material-icons">favorite</i>
    </button>
  </li>
</template>

<style>
.task {
  list-style: none;
  outline: 2px solid var(--color-border);
}

.task__text {
  padding: 1em;
}

.task .btn {
  background: var(--vt-c-accent);
  padding: 0.5em;
}
</style>
