import React, { useState, useEffect, useRef } from "react";
import { Bell, CircleUser } from "lucide-react";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setIsNotificationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
   <nav className="bg-white border-gray dark:bg-gray-800">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    {/* Logo */}
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className="h-4" alt="Logo" />
    </a>

    {/* Desktop Navigation Links beside user icon */}
    <div className="hidden md:flex items-center space-x-6">
      {/* Home */}
      <a
        href="#"
        className="text-l text-blue-700 dark:text-white"
      >
        Home
      </a>

      {/* Notification */}
      <div ref={notificationDropdownRef} className="relative">
        <button
          onClick={() => setIsNotificationDropdownOpen((prev) => !prev)}
          className="flex items-center text-gray-700 hover:text-gray-900 dark:text-white"
        >
          <Bell size={20}/>
        </button>
        {isNotificationDropdownOpen && (
          <div className="absolute right-0 mt-2 z-50 w-56 text-sm bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:divide-gray-600">
            <div className="px-4 py-3 text-gray-700 dark:text-white">
              <p>No new notifications</p>
            </div>
          </div>
        )}
      </div>

      {/* User Menu */}
      <div className="relative" ref={userDropdownRef}>
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          onClick={() => setIsUserDropdownOpen((prev) => !prev)}
        >
          <span className="sr-only">Open user menu</span>
          <CircleUser className="w-8 h-8 text-gray-300" />
        </button>

        {isUserDropdownOpen && (
          <div className="absolute right-0 mt-2 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:divide-gray-600">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>

    {/* Mobile Menu Button */}
    <button
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      onClick={() => setIsMobileMenuOpen((prev) => !prev)}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>

    {/* Mobile Nav (Home + Notification) */}
    {isMobileMenuOpen && (
      <div className="w-full mt-4 md:hidden">
        <ul className="space-y-2 font-medium bg-gray-50 rounded-lg p-4 dark:bg-gray-800">
          <li>
            <a
              href="#"
              className="block text-gray-900 dark:text-white hover:underline"
            >
              Home
            </a>
          </li>
          <li>
            <button
              onClick={() =>
                setIsNotificationDropdownOpen((prev) => !prev)
              }
              className="flex items-center gap-2 text-gray-900 dark:text-white"
            >
              <Bell />
              Notifications
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>
</nav>

  );
};

export default Navbar;
