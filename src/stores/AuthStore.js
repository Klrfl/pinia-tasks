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
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import router from "../router/index.js";

const auth = getAuth(app);

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
          if (!user.isAnonymous) this.isLoggedIn = true;
          router.push({ name: "home" });
        } else {
          this.isLoggedIn = false;
          this.handleAnonSignUp();
        }
      });

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

    async handleSignUserOut() {
      try {
        await signOut(auth);
        this.user = null;
        router.go();
      } catch (err) {
        this.errorMessage = err.message;
        console.error(err.message);
      }
    },
  },
});
