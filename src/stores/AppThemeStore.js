import { defineStore } from "pinia";

function getInitialTheme() {
  const theme = localStorage.getItem("theme");
  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

  if (theme !== "dark" && theme !== "light") {
    if (prefersDarkTheme.matches) localStorage.setItem("theme", "dark");
    else localStorage.setItem("theme", "light");
  }

  return localStorage.getItem("theme");
}

export const useAppThemeStore = defineStore("appTheme", {
  state: () => ({
    theme: getInitialTheme(),
  }),

  actions: {
    changeTheme(inputTheme) {
      if (inputTheme === "dark") this.theme = "light";
      else this.theme = "dark";
    },
  },
});
