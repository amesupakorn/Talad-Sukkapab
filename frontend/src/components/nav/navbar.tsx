import { useState } from "react";
import { Link } from "react-router-dom";
import UserDropdown from "./userDrop";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto px-4 py-2">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-red-500">SuKaPab</div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-grow mx-8">
            <div className="w-full max-w-[600px] mx-auto flex bg-gray-100 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search here"
                className="flex-grow bg-transparent outline-none px-4 py-2 text-sm text-gray-700 placeholder-gray-400"
              />
              <button className="bg-red-500 hover:bg-red-600 px-3 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <UserDropdown />
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden text-gray-500 hover:text-red-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row md:justify-center mt-4 border-t border-gray-200`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 text-gray-700 font-medium items-center space-y-3 md:space-y-0 py-2">
            {["Home", "About", "Product", "Contact"].map((menu) => (
              <li
                key={menu}
                className={`cursor-pointer ${
                  validPaths.includes(location.pathname.slice(1)) &&
                  activeMenu === menu
                    ? "text-red-500 font-semibold"
                    : "text-gray-700"
                } hover:text-red-500`}
                onClick={() => setActiveMenu(menu)}
              >
                <Link to={`/${menu.toLowerCase()}`}>{menu}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
