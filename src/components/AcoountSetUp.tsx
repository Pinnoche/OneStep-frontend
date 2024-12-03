import { useState, ChangeEvent, FormEvent } from "react";

// Define types for props
interface AccountSetupProps {
  onNext: (data: AccountData) => void; // onNext expects a function that receives `data` and doesn't return anything
  username?: string; // Optional username prop
}

// Define the structure of `data` state
interface AccountData {
  username: string;
  dob: string;
  phone_number: string;
  referralCode: string;
}

function AccountSetup({ onNext, username }: AccountSetupProps) {
  // Define state with the correct type
  const [data, setData] = useState<AccountData>({
    username: "",
    dob: "",
    phone_number: "",
    referralCode: "",
  });

  // Handle change for form inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext(data); 
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-4">Setup your Account</h1>
        <p className="text-center text-sm text-gray-400 mb-8">
          Enter your Username, Date of Birth, and Phone Number below
        </p>

        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 flex justify-center items-center bg-gray-800 text-white rounded-full">1</div>
            <span className="ml-2 text-gray-300">Account Setup</span>
          </div>
          <div className="w-6 border-t border-gray-700"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 flex justify-center items-center bg-gray-600 text-white rounded-full">2</div>
            <span className="ml-2 text-gray-500">Setup Passcode</span>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm text-gray-400 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={data.username}
              className="w-full p-3 bg-gray-800 rounded-md text-white outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder={username ? username : "Enter your Username"}
              // disabled={Boolean(username)}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500 mt-1">Must be up to 8 characters and unique</p>
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label htmlFor="dob" className="block text-sm text-gray-400 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={data.dob}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded-md text-white outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm text-gray-400 mb-1">
              Phone Number
            </label>
            <div className="flex items-center bg-gray-800 rounded-md">
              <span className="px-3 text-gray-400 cursor-default">NG</span>
              <input
                type="tel"
                id="phone"
                name="phone_number"
                value={data.phone_number}
                onChange={handleChange}
                className="flex-1 p-3 bg-gray-800 text-white outline-none focus:ring-2 focus:ring-yellow-500 rounded-md"
                placeholder="Phone Number"
              />
            </div>
          </div>

          {/* Referral Code */}
          <div className="mb-4">
            <label htmlFor="referral" className="block text-sm text-gray-400 mb-1">
              Referral Code
            </label>
            <div className="relative">
              <input
                type="text"
                id="referral"
                name="referralCode"
                value={data.referralCode}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded-md text-white outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter referral code"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4H9l4-4 4 4h-3v4z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            PROCEED
          </button>

          {/* Footer Note */}
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

export default AccountSetup;
