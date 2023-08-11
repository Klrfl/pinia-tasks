// TODO: add Firebase
import { defineStore } from "pinia";
import { app } from "../firebase/index.js";

import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAuthStore } from "./AuthStore.js";

const db = getFirestore(app);
const tasksRef = collection(db, "tasks");

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    errorMessage: "",
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
      const authStore = useAuthStore();
      const userId = authStore.user.uid;
      const q = query(
        tasksRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );

      try {
        onSnapshot(q, (snapshot) => {
          const data = snapshot.docs;
          this.tasks = data.map((task) => {
            return { id: task.id, ...task.data() };
          });
        });
      } catch (err) {
        this.errorMessage = err.message;
        console.error(err.message);
      }
    },

    async addTask(uid, task) {
      await addDoc(tasksRef, {
        userId: uid,
        createdAt: serverTimestamp(),
        ...task,
      });
    },

    async deleteTask(taskId) {
      const taskDocRef = doc(db, "tasks", taskId);
      await deleteDoc(taskDocRef);
    },

    completeTask(task) {
      const taskDocRef = doc(db, "tasks", task.id);
      updateDoc(taskDocRef, {
        isDone: !task.isDone,
      });
    },

    favTask(task) {
      const taskDocRef = doc(db, "tasks", task.id);
      updateDoc(taskDocRef, {
        isFav: !task.isFav,
      });
    },
  },
});
