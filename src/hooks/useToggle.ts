import { useState, useCallback } from "react";

type ToggleActions = {
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export const useToggle = (initialState = false): [boolean, ToggleActions] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((prev) => !prev), []);
  const open = useCallback(() => setState(true), []);
  const close = useCallback(() => setState(false), []);

  return [state, { toggle, open, close }];
};
