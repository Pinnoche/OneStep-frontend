import telegram from "../assets/telegram.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const gotoSignUp = () => {
    navigate("/create-account");
  };
  const tGBot = "PinnocheBot";
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", tGBot);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", "https://df94-197-211-58-163.ngrok-free.app/send-otp");
    script.setAttribute("data-request-access", "write");
    document.getElementById("telegram-login-container").appendChild(script);
  }, [tGBot]);

  return (
    <>
      <div className="container max-w-6xl rounded-md border border-[#585b609c] py-8 px-8 mx-auto text-center">
        <h1 className="text-6xl font-semibold font-serif">Login</h1>
        <p className="my-8">
          Access Wealth with either your OneStep Passcode, OneStep Biometrics or
          OneStep ID Verification
        </p>
        <p className="uppercase text-4xl font-serif font-semibold ">
          use onsestep id to login
        </p>
        <p className="text-[#b6b5b592] my-4">
          Use the OneStep Verification to Login into your Account
        </p>
        <h2 className="uppercase">Kindly select the messenger below</h2>
        <div className="mx-auto w-[10%] my-8 cursor-pointer">
          <img src={telegram} alt="telegram" width={100} />
        </div>
        <div id="telegram-login-container" className="mx-auto w-[20%]">
        </div>
        <p className="underline font-semibold text-lg text-[#72692a] text-end mr-32">
          Recovery Center
        </p>
        <p>Having Trouble using OneStep Verification?</p>
        <button className="font-bold text-black text-lg px-4 py-3 bg-[#72692a] rounded-md my-8 w-1/2 hover:bg-[#c6b955]">
          HELP CENTER
        </button>
      </div>
      <div className="w-full my-8 text-center">
        <p className="">
          By using Login you agree to our{" "}
          <span className="text-[#928535] underline cursor-pointer">
            terms and conditions
          </span>
        </p>
        <p>Are you new Here?</p>
        <button
          onClick={gotoSignUp}
          className="font-bold text-black text-lg px-4 py-3 bg-[#72692a] rounded-md my-8 w-1/2 hover:bg-[#c6b955]"
        >
          SIGN UP
        </button>
      </div>
    </>
  );
}

export default Login;
