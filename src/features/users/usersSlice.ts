import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { UserProfile } from "../profile/profileSlice";

interface UsersState {
  users: UserProfile[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

// Async Thunk for fetching all users
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const usersCollection = collection(db, "profiles");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as UserProfile[];
    return userList;
  }
);

// Async Thunk for updating a user's role
export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async ({ userId, isAdmin }: { userId: string; isAdmin: boolean }) => {
    const userRef = doc(db, "profiles", userId);
    await updateDoc(userRef, { isAdmin });
    return { userId, isAdmin };
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Fetch users reducers
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<UserProfile[]>) => {
          state.status = "succeeded";
          state.users = action.payload;
        }
      )
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      })
      // Update user role reducers
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { userId, isAdmin } = action.payload;
        const userIndex = state.users.findIndex((user) => user.uid === userId);
        if (userIndex !== -1) {
          state.users[userIndex].isAdmin = isAdmin;
        }
      });
  },
});

export default usersSlice.reducer;
