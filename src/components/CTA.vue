<script setup>
const props = defineProps({
  center: Boolean,
  fill: Boolean,
});
</script>

<template>
  <button
    :class="{ 'btn--center': center, 'btn--fill': fill }"
    class="btn btn--cta">
    <slot>Click me</slot>
  </button>
</template>
