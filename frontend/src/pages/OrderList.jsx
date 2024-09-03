// src/pages/OrderList.jsx
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import AdminHeader from '../components/HeaderAdmin';
const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      setError('Anda belum login. Silakan login terlebih dahulu.');
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal mengambil data orders.');
        }
        return response.json();
      })
      .then((data) => setOrders(data))
      .catch((error) => setError(error.message));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
        <AdminHeader />
    <div style={{ display: 'flex' }}>
      <main style={{ marginLeft: 260, padding: '20px' }}>
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Order List</h2>
        {error && <p className="text-red-500">{error}</p>}

        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                  <th className="px-6 py-3 border-b border-gray-200 font-semibold text-left">#</th>
                  <th className="px-6 py-3 border-b border-gray-200 font-semibold text-left">Order ID</th>
                  <th className="px-6 py-3 border-b border-gray-200 font-semibold text-left">User ID</th>
                  <th className="px-6 py-3 border-b border-gray-200 font-semibold text-left">Total</th>
                  <th className="px-6 py-3 border-b border-gray-200 font-semibold text-left">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id} className={`hover:bg-blue-50 transition duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="px-6 py-4 border-b border-gray-200 text-center">{index + 1}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{order.id}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{order.user_id}</td>
                    <td className="px-6 py-4 border-b border-gray-200">Rp.{order.total_amount}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{formatDate(order.order_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !error && <p className="text-center mt-6">Tidak ada data order yang tersedia.</p>
        )}
      </main>
    </div>
    </div>
    
  );
};

export default OrderList;
