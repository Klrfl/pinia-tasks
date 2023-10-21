<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "../stores/TaskStore";

const props = defineProps({
  task: Object,
});

const emit = defineEmits(["update:modelValue"]);

const taskStore = useTaskStore();

const task = computed({
  get() {
    return props.task;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const textInput = ref(null);
const isEditingTask = ref(false);

function toggleEditingStatus() {
  isEditingTask.value = !isEditingTask.value;
}

function editTask() {
  toggleEditingStatus();
  textInput.value.focus();
}

function saveTask(taskObject) {
  taskStore.saveNewTask(taskObject);
  toggleEditingStatus();
  textInput.value.blur();
}
</script>

<template>
  <li :class="{ 'task--complete': task.isDone }" class="task">
    <form class="task__form" @submit.prevent>
      <input
        type="text"
        class="task__text"
        v-model="task.text"
        :disabled="!isEditingTask"
        ref="textInput"
      />

      <div class="task__btn-container" v-if="isEditingTask">
        <button
          @click="saveTask(task)"
          class="btn task__edit-done-btn"
          title="save new task"
        >
          <i class="fa-solid fa-floppy-disk"></i>
        </button>

        <button
          class="btn task__edit-cancel-btn"
          title="cancel editing"
          @click="toggleEditingStatus"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="task__btn-container" v-else>
        <button class="btn task__edit-btn" title="edit task" @click="editTask">
          <i class="fa-solid fa-pencil"></i>
        </button>

        <button
          class="btn task__delete-btn"
          title="delete task"
          @click="taskStore.deleteTask(task.id)"
        >
          <i class="fa-solid fa-trash"></i>
        </button>

        <button
          :class="{ 'task__favorite-btn--fav': task.isFav }"
          class="btn task__favorite-btn"
          title="mark as favorite task"
          @click="taskStore.favTask(task)"
        >
          <i class="fa-solid fa-heart"></i>
        </button>

        <button
          :class="{ 'task__favorite-btn--complete': task.isDone }"
          class="btn task__done-btn"
          title="mark task as done"
          @click="taskStore.completeTask(task)"
        >
          <i class="fa-solid fa-check"></i>
        </button>
      </div>
    </form>
  </li>
</template>

<style>
.task,
.task__btn-container,
.task__form {
  display: flex;
  align-items: center;
}

.task {
  list-style: none;
  outline: 2px solid var(--color-border);
  margin-block-end: 0.5rem;
  position: relative;
}

.task--complete .task__text[disabled] {
  text-decoration: line-through;
  filter: brightness(0.7);
}

.task::after {
  content: "";
  position: absolute;
  inset: 0 0 0 auto;
  width: 0.25rem;
  transition: background-color 250ms ease;
}

.task--complete::after {
  background: var(--accent);
}

.task__text {
  padding: 1em;
  margin: 0;
  flex-grow: 1;
}

.task__text:disabled {
  outline: none;
}

.task__form {
  flex-grow: 1;
  justify-content: space-between;
}

.task__form input {
  background: var(--color-background-soft);
  padding: 1em;
  color: inherit;
  flex-grow: 1;
}

.task__form input[disabled] {
  background: transparent;
  cursor: default;
}

.task__form input:focus-visible {
  outline: 2px solid dodgerblue;
}

.task .btn {
  padding: 1em;
  transition: color 0.4s ease;
}

.task__favorite-btn--complete {
  color: var(--accent);
}

.task__favorite-btn--fav {
  color: rgb(203, 6, 6);
}

@media (hover: hover) and (min-width: 40em) {
  .task__delete-btn,
  .task__edit-btn {
    opacity: 0;
    transition: opacity 200ms ease;
  }

  .task:hover .task__delete-btn,
  .task__delete-btn:focus-visible,
  .task:hover .task__edit-btn,
  .task__edit-btn:focus-visible {
    opacity: 1;
  }
}

@media screen and (max-width: 40em) {
  .task__form {
    flex-direction: column;
  }

  .task__form input,
  .task__btn-container {
    flex: 1 1 0;
    width: 100%;
  }

  .task__btn-container {
    justify-content: space-evenly;
  }

  .task__btn-container > * {
    flex: 1;
    text-align: center;
  }
}
</style>
