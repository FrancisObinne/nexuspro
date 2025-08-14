import React from "react";
import Header from "./Header";
import { Toaster } from "sonner";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto p-4 flex-grow">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
