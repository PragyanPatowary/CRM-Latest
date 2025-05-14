import React, { useState, useEffect, useRef } from "react";
import { Bell, CircleUser } from "lucide-react";
import logo from "../assets/logo.svg";

const Navbar = () => {
  // State to control dropdown visibility
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Create a ref for the dropdown menu
  const dropdownRef = useRef(null);
  
  // Function to toggle user dropdown
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  
  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <nav className="bg-white border-gray dark:bg-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={logo}
            className="h-4"
            alt="Logo"
          />
        </a>
        
        {/* Navigation Links - Moved before user profile for better ordering */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? "block" : "hidden"
          } md:block`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
          </ul>
        </div>
        
        {/* User Profile and Mobile Toggle Button */}
        <div className="flex items-center md:order-2">
          {/* User menu button */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-3 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={toggleUserDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <CircleUser className="w-8 h-8 rounded-full text-gray-300" />
            </button>
            
            {/* User dropdown menu */}
            {isUserDropdownOpen && (
              <div
                className="absolute right-0 mt-2 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
              >
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
          
          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;