import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import useCartStore from "../store/useCartStore";
const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";
  return (
    <header className="fixed z-50 top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-4000 transition-all duration-300 border-b border-x-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between">
          <Link
            to="/"
            className="text-xl text-sm-2xl font-bold text-emerald-400 flex items-center space-x-2 "
          >
            E-Commerce
          </Link>
          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to="/cart"
                className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-emerald-400"
                  size={18}
                />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-5 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            {isAdmin && (
              <Link
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                to="/secret-dahboard"
              >
                <Lock className="inline-block mr-1" size={17} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
            {user ? (
              <button
                className=" bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut size={17} />
                <span className="hidden sm:inline ml-sm-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-1 px-3 rounded-md flelx items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-sm-2 inline" size={17} />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
                <Link
                  to="/login"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white py-1 px-3 rounded-md flelx items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-sm-2 inline" size={17} />
                  <span className="hidden sm:inline">Log In</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
