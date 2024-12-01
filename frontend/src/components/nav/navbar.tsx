import { useState } from "react";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          <div className="hidden md:flex items-center space-x-2">
            <button className="bg-red-500 text-white font-medium rounded-lg px-5 py-1.5 hover:bg-red-600">
              Login
            </button>
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
          {/* Mobile Search Bar */}
          {isMenuOpen && (
            <div className="md:hidden mt-4">
              <div className="flex bg-gray-100 rounded-lg overflow-hidden mb-4">
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
          )}

          {/* Main Menu */}
          <ul className="flex flex-col md:flex-row md:space-x-6 text-gray-700 font-medium items-center space-y-3 md:space-y-0 py-2">
          <li
              className="relative cursor-pointer hover:text-red-500 flex items-center md:py-2 hidden md:flex"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              Shop all
              {/* Conditional Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`ml-1 w-4 h-4 ${
                  isDropdownOpen ? "rotate-180 text-red-500" : "text-gray-400"} transition-transform duration-200`}>
                
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 9l-7.5 7.5L4.5 9"
                />
              </svg>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <ul className="absolute top-full bg-white shadow-md text-black rounded-md px-2 mr-12 py-2 w-[600px] text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 hover:text-red-500 cursor-pointer">
                    Category 1
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 hover:text-red-500 cursor-pointer">
                    Category 2
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 hover:text-red-500 cursor-pointer">
                    Category 3
                  </li>
                </ul>
              )}
            </li>


            {["Home", "About", "Product", "Contact"].map((menu) => (
              <li
                key={menu}
                className={`cursor-pointer ${
                  activeMenu === menu
                    ? "text-red-500 font-semibold"
                    : "hover:text-red-500"
                }`}
                onClick={() => setActiveMenu(menu)}
              >
                {menu}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Sign In/Sign Up */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-2">
            
            <button className="bg-red-500 text-white font-medium rounded-lg px-5 py-2 hover:bg-red-600">
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
