import { useState, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios";

// Define the type for the location state
interface LocationState {
  telegram_id: string;
  username: string;
}

interface ErrorResponse {
  response: {
    data: {
      info?: string;
    };
  };
}

function SendOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extracting telegram_id and username from location.state
  const { telegram_id, username }: LocationState = location.state || {};

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handle OTP input change
  const handleChange = (element: HTMLInputElement, index: number): void => {
    if (isNaN(Number(element.value))) return; // Ensure only numbers are entered
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move focus to the next input
    if (element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  // Send OTP function
  const sendOtp = async (): Promise<void> => {
    try {
      setIsSubmitting(true);
      await axios.post("/send-otp", { telegram_id: telegram_id });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Verify OTP function
  const verifyOtp = async (): Promise<void> => {
    try {
      setIsSubmitting(true);
      const otpString = otp.join("");
      const res = await axios.post("/verify-otp", {
        telegram_id: telegram_id,
        otp: otpString,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert(res.data.success);
        navigate("/");
      } 
    } catch (error) {
      console.log(error);

      const err = error as ErrorResponse;
      if (err?.response?.data?.info) {
        navigate("/set-details", {
          state: {
            telegram_id: telegram_id,
            username: username,
          },
        });
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black text-white border border-gray-100 p-8 max-w-lg mx-auto rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-4">OTP Verification</h1>
      <p className="text-lg text-center mb-2">
        Complete the Onestep verification to proceed. It is important for
        account verification.
      </p>
      <p className="text-center mb-6">Enter the OTP verification code sent to you</p>

      <p className="text-center text-lg mb-6">10 Minutes</p>

      {/* OTP Input Fields */}
      <div className="flex justify-between mb-6">
        {otp.map((data, index) => (
          <input
            type="text"
            maxLength="1"
            key={index}
            value={data}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target, index)
            }
            onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
              e.target.select()
            }
            className="w-14 h-14 text-center text-2xl bg-gray-800 text-white rounded-md outline-none focus:ring-2 focus:ring-[#72692a]"
          />
        ))}
      </div>

      {/* Proceed Button */}
      <button
        disabled={isSubmitting}
        onClick={verifyOtp}
        className={`w-full py-3 rounded-md text-lg mb-4 ${
          isSubmitting
            ? "bg-gray-500"
            : "bg-[#72692a] hover:bg-[#c6b955] focus:ring-2 focus:ring-[#ada24c]"
        } `}
      >
        {isSubmitting ? "Verifying..." : "PROCEED"}
      </button>

      {/* Resend OTP Link */}
      <p className="text-center text-sm text-gray-400">
        Didn't receive your OTP?{" "}
        <span onClick={sendOtp} className="text-[#72692a] cursor-pointer">
          Resend OTP
        </span>
      </p>

      {/* Footer */}
      <footer className="text-center mt-6 text-sm text-gray-400">
        By using Login you agree to our{" "}
        <a href="#" className="text-[#72692a] underline">
          Terms & Privacy Policy
        </a>
      </footer>
    </div>
  );
}

export default SendOtp;
