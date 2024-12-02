import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Welcome from "./Pages/Welcome";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import SendOtp from "./Pages/SendOtp";
import VerifyOtp from "./Pages/VerifyOtp";
import AuthTg from "./Pages/AuthTg";
import SetUp from "./Pages/SetUp";
import Navbar from "./components/Navbar";
function App() {

  return (
    <Router>
        <Navbar />
      <div className="bg-black text-white p-8 min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/create-account" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/send-otp" element={<SendOtp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/auth/tg" element={<AuthTg />} />
          <Route path="/set-details" element={<SetUp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
