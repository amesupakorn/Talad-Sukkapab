import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";


const UserDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [profileImage, setProfileImage] = useState("");

    const logout = () => {
        Cookies.remove("csrftoken"); 
        window.location.href = "/";
    };
  
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const API_URL = "http://localhost:5001";
            const token = localStorage.getItem("token"); // ดึง token จาก localStorage
      
            if (!token) {
              throw new Error("No token found");
            }
      
            const response = await axios.get(`${API_URL}/auth/user`, {
              headers: {
                Authorization: `Bearer ${token}`, // เพิ่ม token ใน Authorization header
              },
              withCredentials: true,
            });
      
            // ตั้งค่าผู้ใช้ ถ้ามีการล็อกอินอยู่
            if (response.data) {
              setIsLoggedIn(true);
              setProfileImage(response.data.profileImage || "https://via.placeholder.com/40");
            }
          } catch (error) {
            console.error("Failed to fetch user data:", error);
            setIsLoggedIn(false);
          }
        };
      
        fetchUserData();
      }, []);

  return (
    <div>
        {isLoggedIn ? (
        <div className="relative">
        {/* Profile Image */}
        <img
            src={profileImage}
            alt="User Profile"
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
        />

        {/* Dropdown Menu */}
        {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-4 z-20">
            {/* User Info */}
            <div className="flex items-center px-4 pb-3 border-b">
                <img
                src="https://via.placeholder.com/40"
                alt="User Profile"
                className="w-12 h-12 rounded-full border border-gray-300"
                />
                <div className="ml-4">
                <h4 className="text-gray-800 font-semibold">Supakorn Thongaerd</h4>
                <p className="text-green-500 text-sm font-medium">Verified</p>
                </div>
            </div>

            {/* Menu Items */}
            <ul className="mt-3">
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <svg className="h-5 w-5 text-zinc-800"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                <span className="ml-3 text-gray-700">Profile</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <svg className="h-5 w-5 text-zinc-800"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                <span className="ml-3 text-gray-700">Buying</span>
                </li>
                
                <li
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                onClick={logout}
                >
                <svg className="h-5 w-5 text-zinc-800"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                <span className="ml-3">Logout</span>
                </li>
            </ul>
            </div>
        )}
        </div>
        ) : (
            <Link to="/signin">
            <button className="bg-red-500 text-white font-medium rounded-lg px-5 py-1.5 hover:bg-red-600">
            Login
            </button>
        </Link>
        )}
       </div>
  )
};

export default UserDropdown;
