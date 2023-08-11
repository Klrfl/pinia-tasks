<template>
  <button class="btn btn--cta">
    <slot>Click me</slot>
  </button>
</template>

<style scoped>
.btn--cta {
  outline: 1px solid var(--vt-c-accent);
  margin-block: 1rem;
}
</style>
