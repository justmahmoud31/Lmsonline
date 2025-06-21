import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const tabs = [
  { name: "كورساتي", path: "/userprofile/courses" },
  { name: "اشتراكاتي", path: "/userprofile/subscriptions" },
  { name: "بيانات المستخدم", path: "/userprofile" },
  // Add more tabs easily here
];

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen text-right bg-gray-50">
      <div
        className={`fixed z-40 top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg text-main font-bold">لوحة التحكم</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`block px-4 py-2 rounded-md font-medium transition ${
                location.pathname === tab.path
                  ? "bg-main text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 bg-white shadow-md flex justify-between items-center md:hidden">
          <h1 className="text-lg font-bold">لوحة التحكم</h1>
          <button onClick={() => setSidebarOpen(true)}>
            <FiMenu size={24} />
          </button>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default SidebarLayout;
