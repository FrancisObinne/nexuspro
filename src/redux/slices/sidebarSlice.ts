import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  isExpanded: boolean;
}

const initialState: SidebarState = {
  isExpanded: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    openSidebar: (state) => {
      state.isExpanded = true;
    },
    closeSidebar: (state) => {
      state.isExpanded = false;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
