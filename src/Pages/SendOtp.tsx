import { useNavigate, useLocation } from "react-router-dom";
import axios from "../axios";

function SendOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
        "id": params.get("id"),
        "username": params.get("username"),
    }
  }

  const { id, username } = queryParams();
  const handleOtp = async () => {
    try {
        const res = await axios.post('/send-otp', {"telegram_id": id})
        if(res.data.success){
            navigate("/verify-otp", {state:{telegram_id: id, username: username}});
        }
    } catch (error) {
        console.log(error)
    }
   
  };
  return (
    <div className="bg-[#323131] py-8 px-20 text-white max-w-md rounded-md mx-auto mt-[5%] text-center">
      <h1 className="my-8 font-bold font-serif text-4xl">OneStep ID</h1>
      <p className="my-8">@OneStep Bot</p>
      <p className="my-8">Authorize OneStep to send you Otp on your Telegram</p>
      <button
        onClick={handleOtp}
        className="px-10 py-2 bg-blue-500 rounded-3xl hover:bg-blue-700"
      >
        Send Otp
      </button>
    </div>
  );
}

export default SendOtp;
