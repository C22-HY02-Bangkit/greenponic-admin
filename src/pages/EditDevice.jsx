import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Alert from '../partials/actions/Alert';
import { useAuth } from '../hooks/useAuth';
import {
  editDeviceAPI,
  getDeviceDetailAPI,
  getProductsAPI,
  getUsersAPI,
} from '../utils/http';
import { useNavigate, useParams } from 'react-router-dom';

const EditDevice = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const form = new FormData(e.currentTarget);

      const data = {
        product_id: form.get('product_id'),
        user_id: form.get('user_id'),
      };


      await editDeviceAPI(token, data, id);

      navigate('/device');
    } catch (error) {
      setError(error.response.data?.message);
    }
  };

  useEffect(() => {
    const http = async () => {
      // get detail device
      const device = await getDeviceDetailAPI(token, id);
      setData(device);

      // get list users
      const users = await getUsersAPI(token);
      setUsers(users);

      // get list products
      const products = await getProductsAPI(token);
      setProducts(products);
    };

    http();
  }, []);


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-2xl font-bold mb-3 pl-5">Edit device</h1>

            <form onSubmit={submitHandler}>
              <div className="w-full flex flex-col gap-5 bg-white rounded-lg shadow pt-6 px-12 pb-16">
                <div className="mb-4">{error && <Alert>{error}</Alert>}</div>

                <div className="relative w-full">
                  <label className="text-gray-700" htmlFor="user">
                    Product
                    <select
                      id="user"
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      name="product_id"
                    >
                      <option value="">Select product</option>

                      {products.map((product) => (
                        <option
                          key={product.id}
                          value={product.id}
                          selected={product.id === data?.product_id}
                        >
                          {product.title}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="relative w-full">
                  <label className="text-gray-700" htmlFor="user">
                    User
                    <select
                      id="user"
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      name="user_id"
                    >
                      <option value="">Select User</option>
                      {users.map((user) => (
                        <option
                          key={user.id}
                          value={user.id}
                          selected={user.id === data?.user_id}
                        >
                          {user.fullname} - {user.email}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="relative w-full">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditDevice;
