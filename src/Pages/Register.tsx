import telegram from "../assets/telegram.png";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const gotoSignUp = () => {
    navigate("/auth/tg");
  };

  return (
    <>
      <div className="container max-w-3xl rounded-md border border-white-500 py-8 px-8 mx-auto text-center">
        <h1 className="text-6xl font-semibold font-serif">Register</h1>
        <p className="my-8">
          Access Wealth with either your OneStep Passcode, OneStep Biometrics or
          OneStep ID Verification
        </p>
        <p className="uppercase text-4xl font-serif font-semibold ">
          use onsestep id to register
        </p>
        <p className="text-[#b6b5b592] my-4">
          Use the OneStep Verification to register an Account
        </p>
        <h2 className="uppercase">Kindly select the messenger below</h2>
        <div onClick={gotoSignUp} className="mx-auto w-[10%] my-8 cursor-pointer">
          <img src={telegram} alt="telegram" width={100} />
        </div>
        <p className="underline font-semibold text-lg text-[#72692a] text-end mr-32">
          Recovery Center
        </p>
        <p>Having Trouble using OneStep Verification?</p>
        <button className="font-bold text-black text-lg px-4 py-3 bg-[#72692a] rounded-md my-8 w-1/2 hover:bg-[#c6b955]">
          HELP CENTER
        </button>
      </div>
    </>
  );
}

export default Register;
