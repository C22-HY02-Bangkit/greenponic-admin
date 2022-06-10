import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Alert from '../partials/actions/Alert';
import { useAuth } from '../hooks/useAuth';
import {
  addDeviceAPI,
  editDeviceAPI,
  getDeviceDetailAPI,
  getUsersAPI,
} from '../utils/http';
import { useNavigate, useParams } from 'react-router-dom';

const EditDevice = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [data, setData] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const form = new FormData(e.currentTarget);

      const data = {
        name: form.get('name'),
        code: form.get('code'),
        user_id: form.get('user'),
      };

      await editDeviceAPI(token, data, id);

      navigate('/device');
    } catch (error) {
      // console.log('error', error.response.data);
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
    };

    http();
  }, []);

  console.log('[editDevice]', data, users);

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
                  <label htmlFor="required-name" className="text-gray-700">
                    Device Name
                    <span className="text-red-500 required-dot">*</span>
                  </label>
                  <input
                    type="text"
                    id="required-name"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    name="name"
                    defaultValue={data?.name}
                    placeholder="Device Name"
                  />
                </div>

                <div className="relative w-full">
                  <label htmlFor="required-code" className="text-gray-700">
                    Device Code
                    <span className="text-red-500 required-dot">*</span>
                  </label>
                  <input
                    type="text"
                    id="required-code"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    name="code"
                    defaultValue={data?.code}
                    placeholder="Device Code"
                  />
                </div>

                <div className="relative w-full">
                  <label className="text-gray-700" htmlFor="user">
                    User
                    <select
                      id="user"
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      name="user"
                      defaultValue={data?.user_id}
                    >
                      <option value="">Select User</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.email}
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
