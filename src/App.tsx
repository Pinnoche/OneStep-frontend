import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useUserContext } from "./Hooks/useUserContext";
import Welcome from "./Pages/Welcome";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import SendOtp from "./Pages/SendOtp";
import VerifyOtp from "./Pages/VerifyOtp";
import AuthTg from "./Pages/AuthTg";
import SetUp from "./Pages/SetUp";
import Navbar from "./components/Navbar";
function App() {
const { user } =useUserContext();
  return (
    <Router>
        <Navbar />
      <div className="bg-black text-white p-8 min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/create-account" element={!user ? <Register /> : <Navigate to="/login" />} />
          <Route path="/auth/tg" element={!user ? <AuthTg />: <Navigate to="/" /> } />
          <Route path="/set-details" element={!user ? <SetUp /> : <Navigate to="" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" /> } />
          <Route path="/send-otp" element={!user ? <SendOtp />: <Navigate to="/login" />} />
          <Route path="/verify-otp" element={!user ? <VerifyOtp />: <Navigate to="login" /> } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
