import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TitleState {
  title: string;
}

const initialState: TitleState = {
  title: "Dashboard",
};

const sidebarSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { updateTitle } = sidebarSlice.actions;

export default sidebarSlice.reducer;
