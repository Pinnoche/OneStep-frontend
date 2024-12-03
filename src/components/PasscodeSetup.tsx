import React, { useState, ChangeEvent } from "react";

// Define the type for the props
interface PasscodeSetupProps {
  onSubmit: (passcode: string) => void;
}

function PasscodeSetup({ onSubmit }: PasscodeSetupProps) {
  const [passcode, setPasscode] = useState<string[]>(Array(6).fill(""));
  const [confirmPasscode, setConfirmPasscode] = useState<string[]>(Array(6).fill(""));

  // Handle passcode change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number, type: "passcode" | "confirmPasscode") => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      // Update either passcode or confirmPasscode
      const newCode = type === "passcode" ? [...passcode] : [...confirmPasscode];
      newCode[index] = value;
      if (type === "passcode") {
        setPasscode(newCode);
      } else {
        setConfirmPasscode(newCode);
      }

      // Move focus to next input
      if (value && index < 5) {
        document.getElementById(`${type}-${index + 1}`)?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passcodeString = passcode.join("");
    const confirmPasscodeString = confirmPasscode.join("");

    if (passcodeString.length === 6 && passcodeString === confirmPasscodeString) {
      onSubmit(passcodeString); // Pass validated passcode to parent
    } else if (passcodeString !== confirmPasscodeString) {
      alert("Passcodes do not match. Please try again.");
    } else {
      alert("Passcode must be 6 digits.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Setup Passcode</h1>
        <p className="text-center text-sm text-gray-400 mb-8">
          Secure your account using a OneStep Passcode
        </p>

        <form onSubmit={handleSubmit}>
          {/* Enter Passcode */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Enter Passcode</label>
            <div className="flex space-x-2">
              {passcode.map((digit, index) => (
                <input
                  key={index}
                  id={`passcode-${index}`}
                  type="password"
                  value={digit}
                  onChange={(e) => handleInputChange(e, index, "passcode")}
                  maxLength="1"
                  className="w-10 h-12 bg-gray-800 rounded-md text-white text-center text-xl outline-none focus:ring-2 focus:ring-yellow-500"
                />
              ))}
            </div>
          </div>

          {/* Confirm Passcode */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Confirm Passcode</label>
            <div className="flex space-x-2">
              {confirmPasscode.map((digit, index) => (
                <input
                  key={index}
                  id={`confirmPasscode-${index}`}
                  type="password"
                  value={digit}
                  onChange={(e) => handleInputChange(e, index, "confirmPasscode")}
                  maxLength="1"
                  className="w-10 h-12 bg-gray-800 rounded-md text-white text-center text-xl outline-none focus:ring-2 focus:ring-yellow-500"
                />
              ))}
            </div>
          </div>

          {/* Proceed Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            PROCEED
          </button>

          <p className="mt-4 text-xs text-gray-500 text-center">
            By using Login you agree to our{" "}
            <a href="#" className="text-yellow-500 underline">
              Terms & Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default PasscodeSetup;
