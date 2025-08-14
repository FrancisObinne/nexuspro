import { updateTitle } from "@/redux/slices/titleSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export const useTitle = () => {
  const dispatch = useDispatch<AppDispatch>();
  const title = useSelector((state: RootState) => state.title.title);

  return {
    title,
    updateTitle: (newTitle: string) => dispatch(updateTitle(newTitle)),
  };
};
