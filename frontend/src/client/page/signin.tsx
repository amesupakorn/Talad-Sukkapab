import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/nav/navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { ring } from 'ldrs'
import SignGoogle from "../components/authen/signGoogle";

const SignIn = () => {
  ring.register()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ฟังก์ชันจัดการการเข้าสู่ระบบ
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // ตรวจสอบ validation
    if (!email || !password) {
      return setError("Email and Password are required");
    }

    try {
      setIsLoading(true);
      setError("");

      const API_URL = "http://localhost:5001"; 
      const response = await axios.post(
        `${API_URL}/auth/signin`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);

      navigate("/");


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Invalid email or password";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Sign In Section */}
      <div className="flex justify-center items-center min-h-[110vh]">
        <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-6 md:p-12 space-y-6 md:space-y-0 md:space-x-8">
          {/* Illustration */}
          <div className="hidden md:block">
            <img
              src="images/shop.png"
              alt="Illustration"
              className="w-[500px] h-auto"
            />
          </div>

          {/* Form Section */}
          <div className="w-full max-w-[400px]">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Lets Start Shopping</h1>
            <p className="text-gray-600 mb-6">Please login or sign up to continue</p>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form className="space-y-4" onSubmit={handleSignIn}>
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <div className="absolute inset-y-0 left-4 flex items-center">
                  <svg
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <div className="absolute inset-y-0 left-4 flex items-center">
                  <svg
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>

              {/* LogIn Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                {isLoading ? (
                   <l-ring
                   size="20"
                   stroke="2"
                   bg-opacity="0"
                   speed="2" 
                   color="white" 
                 ></l-ring>
                ) : (
                  "LogIn"
                )}
              </button>

              <div className="flex items-center w-full">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-3 text-gray-500 text-sm">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>              
              {/* Google Button */}

              <SignGoogle />
            </form>

            {/* Footer */}
            <p className="text-gray-600 text-center mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-red-500 hover:underline">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
