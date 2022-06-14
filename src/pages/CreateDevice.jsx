import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Alert from '../partials/actions/Alert';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { addDeviceAPI, getProductsAPI, getUsersAPI } from '../utils/http';

const CreateDevice = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setproducts] = useState([]);
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const form = new FormData(e.currentTarget);

      const data = {
        user_id: form.get('user_id'),
        product_id: form.get('product_id'),
      };
      console.log(data);

      await addDeviceAPI(token, data);
      navigate('/device');
    } catch (error) {
      setError(error.response.data?.message);
    }
  };

  useEffect(() => {
    const http = async () => {
      const users = await getUsersAPI(token);
      const products = await getProductsAPI(token);

      setproducts(products);
      setUsers(users);
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
            <h1 className="text-2xl font-bold mb-3 pl-5">Create device</h1>

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
                      <option disabled>Select product</option>

                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
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
                      <option disabled>Select User</option>

                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
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
                    Create
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

export default CreateDevice;
