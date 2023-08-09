// TODO: add Firebase
import { defineStore } from "pinia";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
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
    getTasksFromFirestore() {
      try {
        onSnapshot(tasksRef, (snapshot) => {
          const data = snapshot.docs;
          this.tasks = data.map((task) => {
            return { id: task.id, ...task.data() };
          });
        });
      } catch (err) {
        console.error(err.message);
      }
    },

    async addTask(task) {
      await addDoc(tasksRef, task);
    },

    async deleteTask(taskId) {
      const taskDocRef = doc(db, "tasks", taskId);
      await deleteDoc(taskDocRef);
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
