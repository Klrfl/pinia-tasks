import { defineStore } from "pinia";

function getLocalTasks() {
  return JSON.parse(localStorage.getItem("pinia-tasks")) || [];
}

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: getLocalTasks(),
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
    saveTaskToLocalStorage() {
      localStorage.setItem("pinia-tasks", JSON.stringify(this.tasks));
    },

    addTask(task) {
      this.tasks.push(task);
      this.saveTaskToLocalStorage();
    },

    deleteTask(taskId) {
      const newTasks = this.tasks.filter((task) => task.id !== taskId);
      this.tasks = newTasks;
      this.saveTaskToLocalStorage();
    },

    completeTask(taskId) {
      const completedTask = this.tasks.find((task) => task.id === taskId);
      completedTask.isDone = !completedTask.isDone;
      this.saveTaskToLocalStorage();
    },

    favTask(taskId) {
      const favTask = this.tasks.find((task) => task.id === taskId);
      favTask.isFav = !favTask.isFav;
      this.saveTaskToLocalStorage();
    },
  },
});
