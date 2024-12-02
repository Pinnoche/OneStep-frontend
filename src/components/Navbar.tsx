import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full py-2 px-6 bg-gray-300 text-black font-bold text-lg">
      <div className="w-full flex justify-between items-center">
        <Link to="/" className="hover:bg-gray-600 px-3 py-2 rounded-xl cursor-pointer">Home</Link>
        <div className="flex justify-between items-center space-x-4">
          <Link to="/login" className="hover:bg-gray-600 px-3 py-2 rounded-xl cursor-pointer">Login</Link>
          <Link to="/create-account" className="hover:bg-gray-600 px-3 py-2 rounded-xl cursor-pointer">SignUp</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
