import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AccountSetup from "./AcoountSetUp";
import PasscodeSetup from "./Passcodesetup";
import axios from '../axios'

function SetupForm() {
  const location =useLocation();
    const { username, telegram_id } = location.state || { }
  const [step, setStep] = useState(1);

  
  const [formData, setFormData] = useState({
    username: "",
    telegram_id: telegram_id,
    dob: "",
    phone_number: "",
    referralCode: "",
    passcode: "",
  });

  // Update state for Account Setup
  const handleAccountSetup = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep(2); 
  };

  // Update state for Passcode Setup
  const handlePasscodeSetup = (passcode) => {
    setFormData((prevData) => ({ ...prevData, passcode }));
    submitData(); 
  };

  // Submit data to endpoint
  const submitData = async () => {
    try {
      const response = await axios("/register", formData);

      const result = await response.data;
      console.log("Success:", result);
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting your data.");
    }
  };

  return (
    <div>
      {step === 1 && <AccountSetup onNext={handleAccountSetup} username= {username} />}
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
