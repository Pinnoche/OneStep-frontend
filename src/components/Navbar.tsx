import { Link, useNavigate } from "react-router-dom";

interface User {
  username: string;
  user_id: number;
  os_id: string;
  telegram_id: string;
}

function Navbar() {
  const navigate = useNavigate();

  const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="w-full py-2 px-6 bg-gray-300 text-black font-bold text-lg">
      <div className="w-full flex justify-between items-center">
        <Link
          to="/"
          className="hover:bg-gray-600 px-3 py-2 rounded-xl cursor-pointer"
        >
          Home
        </Link>
        <div className="flex justify-between items-center space-x-4">
          {!user && (
            <>
              <Link
                to="/login"
                className="hover:bg-gray-600 px-3 py-2 rounded-xl cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/create-account"
                className="hover:bg-gray-600 px-3 py-2 rounded-xl cursor-pointer"
              >
                SignUp
              </Link>
            </>
          )}

          {user && (
            <div
              onClick={logout}
              className="hover:bg-gray-600 px-3 py-2 rounded-xl cursor-pointer"
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
