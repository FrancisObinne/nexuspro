import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  toggleSidebar,
  closeSidebar,
  openSidebar,
} from "@/redux/slices/sidebarSlice";

export const useSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isExpanded = useSelector(
    (state: RootState) => state.sidebar.isExpanded
  );

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  return {
    isExpanded,
    toggleSidebar: handleToggleSidebar,
    openSidebar: handleOpenSidebar,
    closeSidebar: handleCloseSidebar,
  };
};
