import { defineStore } from "pinia";

import { app } from "../firebase/index.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(app);

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: {},
  }),

  actions: {
    async handleUserSignUp(email, password) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.isLoggedIn = true;
        console.log("created new user");
        this.user = response.user;
      } catch (err) {
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
        this.isLoggedIn = true;
        this.user = response.user;
        console.log("log in successful");
      } catch (err) {
        console.error(err.message);
      }
    },

    async handleSignUserOut() {
      try {
        await signOut(auth);
        console.log("you should be signed out now");
        this.isLoggedIn = false;
        this.user = {};
      } catch (err) {
        console.error(err.message);
      }
    },
  },

  getters: {
    userIsLoggedIn() {
      return this.isLoggedIn;
    },
  },
});
