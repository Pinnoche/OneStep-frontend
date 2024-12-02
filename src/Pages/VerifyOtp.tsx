import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios";

function SendOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { telegram_id, username } = location.state || {};
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move focus to next input
    if (element.nextSibling) element.nextSibling.focus();
  };

  const sendOtp = async () => {
    try {
      setIsSubmitting(true);
      await axios.post("/send-otp", { telegram_id: telegram_id });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setIsSubmitting(true);
      const otpString = otp.join("");
      const res = await axios.post("/verify-otp", {
        telegram_id: telegram_id,
        otp: otpString,
      });
      if (res.data.success) {
        alert(res.data.success);
        navigate("/");
      }
      if (res.data.info) {
        navigate("/set-details", {
          state: {
            telegram_id: telegram_id,
            username: username,
          },
        });
      }
    } catch (error) {
      console.log(error);
      alert(error);
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
      <p className="text-center mb-6">
        Enter the OTP verification code sent to you
      </p>

      <p className="text-center text-lg mb-6">10 Minutes</p>

      {/* OTP Input Fields */}
      <div className="flex justify-between mb-6">
        {otp.map((data, index) => (
          <input
            type="text"
            maxLength="1"
            key={index}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
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
