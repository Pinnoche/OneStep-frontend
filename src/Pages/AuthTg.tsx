import { useEffect } from "react";

function AuthTg() {
    const tGBot = "PinnocheBot";
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", tGBot);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", "https://321b-197-211-61-100.ngrok-free.app/send-otp");
    script.setAttribute("data-request-access", "write");
    document.getElementById("telegram-login-container").appendChild(script);
  }, [tGBot]);
  return (
    <div className="w-[50%] h-[5%] bg-white m-auto p-8 border border-[#585b609c] flex items-center justify-center rounded-md">
      <div id="telegram-login-container" className="mx-auto"></div>
    </div>
  )
}

export default AuthTg
