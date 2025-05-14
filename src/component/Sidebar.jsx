import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, Building2 } from 'lucide-react';
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);           // Sidebar open for desktop
  const [isMobile, setIsMobile] = useState(false);      // Is screen mobile?
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu open

  // Handle screen resize
  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth <= 200;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);     // Close sidebar on mobile
      else setMobileMenuOpen(false);    // Close mobile menu on desktop
    };

    checkScreen();                       // On first load
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Sidebar links
  const NavLinks = () => (
    <nav className="p-4 space-y-4">
      <NavLinkItem to="/" label="Admin" short="A" />
      <NavLinkItem to="/about" label="Sub-admin" short="S" />
      <NavLinkItem to="/services" label="Employee" short="E" />
    </nav>
  );

  const NavLinkItem = ({ to, label, short }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700 font-semibold" : ""}`
      }
      onClick={() => isMobile && setMobileMenuOpen(false)}
    >
      {(isOpen || mobileMenuOpen) ? label : short}
    </NavLink>
  );

  const SidebarHeader = () => (
    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-white text-black flex items-center justify-center rounded">
          <Building2 className="h-5 w-5" />
        </div>
        {(isOpen || mobileMenuOpen) && <span className="text-xl font-bold">Dashboard</span>}
      </div>
      {!isMobile && (
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      )}
      {isMobile && mobileMenuOpen && (
        <button onClick={() => setMobileMenuOpen(false)} className="text-white">
          <X />
        </button>
      )}
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Mobile Menu Button */}
      {isMobile && !mobileMenuOpen && (
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="fixed top-4 left-4 bg-gray-800 text-white p-2 z-20 rounded"
        >
          <Menu />
        </button>
      )}

      {/* Mobile Sidebar */}
      {isMobile && mobileMenuOpen && (
        <aside className="fixed inset-0 bg-gray-800 text-white z-10 w-64">
          <SidebarHeader />
          <NavLinks />
        </aside>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className={`bg-gray-800 text-white transition-all ${isOpen ? "w-64" : "w-20"} duration-300`}>
          <SidebarHeader />
          <NavLinks />
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-auto">
        {isMobile && (
          <div className="bg-gray-800 text-white h-16 flex items-center px-6">
            <span className="text-xl font-bold">AdminPanel</span>
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
