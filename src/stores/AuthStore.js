import { defineStore } from "pinia";

import { app } from "../firebase/index.js";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signInAnonymously,
  GoogleAuthProvider,
  EmailAuthProvider,
  linkWithCredential,
  signInWithRedirect,
  getRedirectResult,
  linkWithRedirect,
  deleteUser,
  reauthenticateWithCredential,
  signInWithPopup,
} from "firebase/auth";
import router from "../router/index.js";
import { useTaskStore } from "./TaskStore.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: null,
    errorMessage: "",
  }),

  actions: {
    async init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          if (user.isAnonymous) return;
          router.push({ name: "home" });
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
          this.handleAnonSignUp(); // make anon account on first load
        }
      });

      try {
        await getRedirectResult(auth);
      } catch (err) {
        console.error(err.message);
      }

      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (err) {
        console.error(err.message);
      }
    },

    async handleAnonSignUp() {
      try {
        await signInAnonymously(auth);
      } catch (err) {
        this.errorMessage = err.message;
        console.error(err.message);
      }
    },

    async handleUserSignUp(email, password) {
      try {
        const authCredential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(auth.currentUser, authCredential);
        await this.init();
      } catch (err) {
        this.errorMessage = err.message;
        console.error(err.message);
      }
    },

    async handleUserLogIn(email, password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        this.errorMessage = err.message;
        console.error(err.message);
      }
    },

    async handleUserLogInWithGoogle() {
      try {
        await signInWithRedirect(auth, provider);
      } catch (err) {
        console.error(err.message);
      }
    },

    // link anon acc with Google
    async handleUserSignInWithGoogle() {
      try {
        linkWithRedirect(auth.currentUser, provider);
      } catch (err) {
        this.errorMessage = err.message;
        console.error(err.message);
      }
    },

    async handleSignUserOut() {
      try {
        await signOut(auth);
        router.push({ name: "sign-in" });
      } catch (err) {
        this.errorMessage = err.message;
        console.error(err.message);
      }
    },

    async handleDeleteAccount({ email, password }) {
      const taskStore = useTaskStore();
      try {
        //delete tasks associated with user
        for (const task of taskStore.tasks) {
          await taskStore.deleteTask(task.id);
        }
      } catch (err) {
        throw new Error("error deleting tasks");
      }

      if (this.user?.providerData[0].providerId == "password") {
        try {
          const authCredential = EmailAuthProvider.credential(email, password);
          await reauthenticateWithCredential(auth.currentUser, authCredential);
          await deleteUser(auth.currentUser);
        } catch (err) {
          throw new Error(err.message);
        }
      } else {
        try {
          const result = await signInWithPopup(auth, provider);
          this.user = result.user;
          await deleteUser(auth.currentUser);
        } catch (err) {
          throw new Error(err.message);
        }
      }

      router.push({ name: "sign-in" });
    },
  },
});
