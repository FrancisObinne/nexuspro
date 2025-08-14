import React from "react";
import { useIsMobile } from "@/hooks";
import { DesktopLayout } from "./desktop";
import { MobileLayout } from "./mobile";
import { getTokenFromLocalStore } from "@/lib";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthenticatedLayout = () => {
  const isMobile = useIsMobile();
  const access_token = getTokenFromLocalStore("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!access_token) {
      navigate("/auth");
    }
  }, [access_token, navigate]);

  if (isMobile) {
    return <MobileLayout />;
  }

  return <DesktopLayout />;
};
