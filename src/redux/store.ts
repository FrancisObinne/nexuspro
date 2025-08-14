// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import titleReducer from "./slices/titleSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    title: titleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
