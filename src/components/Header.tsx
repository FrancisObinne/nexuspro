// src/components/Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Button } from "@/components/button";
import ThemeToggle from "./ThemeToggle";
import { LogOut, UserCircle, Menu, X } from "lucide-react";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profile } = useSelector((state: RootState) => state.profile);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300 relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300"
        >
          NexusPro
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                to="/events"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Jobs
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to="/profile"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Profile
                </Link>
              </li>
            )}
            {profile?.isAdmin && (
              <li>
                <Link
                  to="/admin"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Action buttons on the right */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center space-x-2">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Link to="/profile">
                  <UserCircle size={20} />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="hidden md:flex">
                <Link to="/logout">
                  <LogOut size={20} className="mr-2" />
                  Log Out
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="md:hidden">
                <Link to="/logout">
                  <LogOut size={20} />
                </Link>
              </Button>
            </div>
          ) : (
            <Button asChild>
              <Link to="/login">Log In</Link>
            </Button>
          )}

          {/* Mobile Hamburger Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md">
          <ul className="flex flex-col space-y-4 p-4 text-center">
            <li>
              <Link
                to="/events"
                className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={toggleMobileMenu}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={toggleMobileMenu}
              >
                Jobs
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to="/profile"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
              </li>
            )}
            {profile?.isAdmin && (
              <li>
                <Link
                  to="/admin"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
