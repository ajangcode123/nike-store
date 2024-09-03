import { Home, Info, ShoppingCart, LogIn, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500 text-white shadow-md sticky top-0 z-50 .proquest-guerrilla-regular">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-extrabold tracking-wide">Shoes Store</h1>
      </div>
      <nav>
        <ul className="flex items-center gap-6">
          <li>
            <Link to="/" className="flex items-center gap-2 hover:text-sky-200 transition-colors duration-300">
              <Home /> Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="flex items-center gap-2 hover:text-sky-200 transition-colors duration-300">
              <ShoppingCart /> Products
            </Link>
          </li>
          <li>
            <Link to="/about" className="flex items-center gap-2 hover:text-sky-200 transition-colors duration-300">
              <Info /> About
            </Link>
          </li>

          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-sky-200 transition-colors duration-300"
              >
                <LogIn /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="flex items-center gap-2 hover:text-sky-200 transition-colors duration-300">
                  <LogIn /> Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="flex items-center gap-2 hover:text-sky-200 transition-colors duration-300">
                  <User /> Register
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/cart" className="flex items-center gap-2 hover:text-sky-200 transition-colors duration-300">
              <ShoppingCart /> Cart
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
  
}
