import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ConfirmEmail = () => {
  const [status, setStatus] = useState("Verifying...");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
        const verifyEmail = async () => {
        try {
            if (!token) {
            setStatus("Invalid or missing token");
            return;
            }

            const API_URL = "http://localhost:5001";
            const response = await axios.get(`${API_URL}/auth/confirm-email`, {
            params: { token },
            });

            setStatus(response.data.message || "Email verified successfully");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setStatus(
            error.response?.data?.error || "An error occurred during verification"
            );
        }
        };

        verifyEmail();
    }, [token]);
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Email Confirmation
        </h1>
        <p className="text-gray-600">{status}</p>
      </div>
    </div>

    
  );

  

};

export default ConfirmEmail;
