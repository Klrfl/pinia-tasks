import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, text: "Learn Pinia", isDone: false, isFav: false },
      { id: 2, text: "Learn CSS Grid properly", isDone: false, isFav: false },
    ],
  }),

  getters: {
    completedTasks() {
      return this.tasks.filter((task) => task.isDone);
    },
    totalTasksCount() {
      return this.tasks.reduce((acc, currentTask) => {
        return currentTask ? acc + 1 : acc;
      }, 0);
    },
    totalCompletedTasksCount() {
      return this.tasks.reduce((acc, currentTask) => {
        return currentTask.isDone ? acc + 1 : acc;
      }, 0);
    },
  },
});
