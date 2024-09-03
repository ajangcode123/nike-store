import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Menambahkan state untuk email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [role, setRole] = useState("customer"); // Default role sebagai customer

  useEffect(() => {
    const token = Cookies.get('token'); // Mengambil token dari cookies
    if (token) {
      setRole("admin"); // Jika token ada, set role menjadi admin
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) { // Validasi password
      setError("Password harus memiliki setidaknya 6 karakter.");
      return;
    }
    try {
      console.log({ username, email, password, role }); // Debugging
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }), // Menambahkan role
      });

      const data = await response.json(); // Mendapatkan response JSON

      if (response.ok) {
        setMessage("Pendaftaran berhasil! Anda sekarang bisa masuk.");
        setError("");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.error || "Pendaftaran gagal. Silakan coba lagi."); // Menampilkan error dari server
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-center text-2xl font-bold">Daftar</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {message && <p className="text-green-500 text-sm">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <input
          type="hidden"
          value={role} // Menyembunyikan role dalam form
        />
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Daftar
        </button>
      </form>
    </div>
  );
}
