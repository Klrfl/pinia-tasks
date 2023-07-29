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
