import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import eventsReducer from "../features/events/eventsSlice";
import usersReducer from "../features/users/usersSlice";
import themeReducer from "../features/theme/themeSlice";
import jobsReducer from "../features/jobs/jobsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    events: eventsReducer,
    users: usersReducer,
    theme: themeReducer,
    jobs: jobsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
