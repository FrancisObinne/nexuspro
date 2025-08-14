import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  uid: string;
  name: string;
  bio: string;
  photoURL?: string;
  membershipTier: "free" | "pro";
  isAdmin: boolean;
}

interface ProfileState {
  profile: UserProfile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  status: "idle",
  error: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload;
      state.status = "succeeded";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setProfile, setLoading, setError } = profileSlice.actions;
export default profileSlice.reducer;
