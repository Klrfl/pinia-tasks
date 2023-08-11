import { defineStore } from "pinia";

import { app } from "../firebase/index.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
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
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          this.user = user;
          router.push({ name: "home" });
        } else {
          this.user = null;
          router.push({ name: "sign-in" });
        }
      });
    },

    async handleUserSignUp(email, password) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        this.user = response.user;
        this.isLoggedIn = true;
        router.push({ name: "home" }); // redirect to home
      } catch (err) {
        this.errorMessage = err.message;
        console.error(err.message);
      }
    },

    async handleUserLogIn(email, password) {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        this.user = response.user;
        this.isLoggedIn = true;
        router.push({ name: "home" }); // redirect to home
      } catch (err) {
        this.errorMessage = err.message;
        console.error(err.message);
      }
    },

    async handleSignUserOut() {
      try {
        await signOut(auth);

        this.user = null;
        this.isLoggedIn = false;
        router.push({ name: "sign-in" });
      } catch (err) {
        this.errorMessage = err.message;
        console.error(err.message);
      }
    },
  },
});
