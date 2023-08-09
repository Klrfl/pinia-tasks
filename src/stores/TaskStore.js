// TODO: add Firebase
import { defineStore } from "pinia";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcUAuCiDn1Lp3tQEaFewMIgHmQ9CdZi0E",
  authDomain: "pinia-tasks-2b2da.firebaseapp.com",
  projectId: "pinia-tasks-2b2da",
  storageBucket: "pinia-tasks-2b2da.appspot.com",
  messagingSenderId: "474366281228",
  appId: "1:474366281228:web:c0804a2a755fa9749ad029",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tasksRef = collection(db, "tasks");

function getLocalTasks() {
  return JSON.parse(localStorage.getItem("pinia-tasks")) || [];
}

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
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
    async getTasksFromFirestore() {
      try {
        const response = await getDocs(tasksRef);
        const data = response.docs;

        const taskArr = data.map((task) => {
          return { id: task.id, ...task.data() };
        });

        console.log(taskArr);
        this.tasks = taskArr;
      } catch (err) {
        console.error(err.message);
      }
    },

    // saveTaskToLocalStorage() {
    //   localStorage.setItem("pinia-tasks", JSON.stringify(this.tasks));
    // },

    async addTask(task) {
      // this.tasks.push(task);
      // this.saveTaskToLocalStorage();
      await addDoc(tasksRef, task);
    },

    async deleteTask(taskId) {
      // const newTasks = this.tasks.filter((task) => task.id !== taskId);
      // this.tasks = newTasks;
      // this.saveTaskToLocalStorage();
      const taskDocRef = doc(db, "tasks", taskId);
      await deleteDoc(taskDocRef);
    },

    completeTask(taskId) {
      const completedTask = this.tasks.find((task) => task.id === taskId);
      completedTask.isDone = !completedTask.isDone;
      // this.saveTaskToLocalStorage();
    },

    favTask(taskId) {
      const favTask = this.tasks.find((task) => task.id === taskId);
      favTask.isFav = !favTask.isFav;
      // this.saveTaskToLocalStorage();
    },
  },
});
