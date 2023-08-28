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
} from "firebase/auth";
import router from "../router/index.js";

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
          this.isLoggedIn = true;
          router.push({ name: "home" });
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
