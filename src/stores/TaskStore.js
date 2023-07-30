import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, text: "Learn Pinia", isDone: false, isFav: false },
      { id: 2, text: "Learn CSS Grid properly", isDone: false, isFav: false },
    ],
  }),

  getters: {
    totalTasksCount() {
      return this.tasks.reduce((acc, currentTask) => {
        return currentTask ? acc + 1 : acc;
      }, 0);
    },

    completedTasks() {
      return this.tasks.filter((task) => task.isDone);
    },

    favoriteTasks() {
      return this.tasks.filter((task) => task.isFav);
    },

    totalCompletedTasksCount() {
      return this.tasks.reduce((acc, currentTask) => {
        return currentTask.isDone ? acc + 1 : acc;
      }, 0);
    },

    totalFavoriteTasksCount() {
      return this.tasks.reduce((acc, currentTask) => {
        return currentTask.isFav ? acc + 1 : acc;
      }, 0);
    },
  },

  actions: {
    addTask(task) {
      this.tasks.push(task);
    },

    deleteTask(taskId) {
      const newTasks = this.tasks.filter((task) => task.id !== taskId);
      this.tasks = newTasks;
    },

    completeTask(taskId) {
      const completedTask = this.tasks.find((task) => task.id === taskId);
      completedTask.isDone = !completedTask.isDone;
    },

    favTask(taskId) {
      const favTask = this.tasks.find((task) => task.id === taskId);
      favTask.isFav = !favTask.isFav;
    },
  },
});
