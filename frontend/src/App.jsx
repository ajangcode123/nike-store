import { createContext, useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const CartContext = createContext();
export const UserContext = createContext(); // Tambahkan UserContext

export default function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(
    Cookies.get("token") ? jwtDecode(Cookies.get("token")) : null
  ); // State untuk user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Outlet />
      </CartContext.Provider>
    </UserContext.Provider>
  );
}
