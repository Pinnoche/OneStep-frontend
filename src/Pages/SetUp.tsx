import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccountSetup from "../components/AcoountSetUp";
import PasscodeSetup from "../components/PasscodeSetup";
import axios from '../axios'

interface LocationState {
  username: string;
  telegram_id: string;
}

interface FormData {
  username: string;
  telegram_id: string;
  dob: string;
  phone_number: string;
  referralCode: string;
  passcode: string;
}

function SetupForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, telegram_id }: LocationState = location.state || { username: "", telegram_id: "" };

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    telegram_id: telegram_id,
    dob: "",
    phone_number: "",
    referralCode: "",
    passcode: "",
  });


  const handleAccountSetup = (data: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep(2); 
  };

  const handlePasscodeSetup = (passcode: string) => {
    setFormData((prevData) => ({ ...prevData, passcode }));
    submitData(); 
  };

  const submitData = async () => {
    try {
      const response = await axios.post("/register", formData);
      const result = response.data;
      console.log("Success:", result);
      alert(result.success);
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/');
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting your data.");
    }
  };

  return (
    <div>
      {step === 1 && <AccountSetup onNext={handleAccountSetup} username={username} />}
      {step === 2 && <PasscodeSetup onSubmit={handlePasscodeSetup} />}

      <div className="flex justify-center mt-4">
        {step > 1 && (
          <button
            className="text-gray-500 underline mr-4"
            onClick={() => setStep(step - 1)}
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}

export default SetupForm;
