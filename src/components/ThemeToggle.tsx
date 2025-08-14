import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { RootState } from "../app/store";
import { Button } from "@/components/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <Button variant="ghost" size="icon" onClick={() => dispatch(toggleTheme())}>
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
};

export default ThemeToggle;
