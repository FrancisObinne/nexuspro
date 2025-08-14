import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark";
}

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme") as "light" | "dark";
  }
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
