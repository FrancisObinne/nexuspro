import React from "react";
import { PulseLoader } from "react-spinners";

interface LoaderProps {
  size?: number;
  color?: string;
  fullscreen?: boolean;
  text?: string;
}

export default function Loader({
  size = 30,
  color = "#36d7b7",
  text,
}: LoaderProps) {
  return (
    <div
      className={`h-full w-full flex flex-col justify-center items-center bg-white/70`}
      role="status"
      aria-label="Loading"
    >
      <PulseLoader color={color} size={size} />
      {text && <span className="sr-only">{text}</span>}
    </div>
  );
}
