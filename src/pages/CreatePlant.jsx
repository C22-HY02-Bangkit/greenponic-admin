import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Alert from '../partials/actions/Alert';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { addPlantAPI } from '../utils/http';

const CreatePlant = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const form = new FormData(e.currentTarget);

      const data = {
        name: form.get('name'),
        min_ph: form.get('min_ph'),
        max_ph: form.get('max_ph'),
        min_ec: form.get('min_ec'),
        max_ec: form.get('max_ec'),
        min_tds: form.get('min_tds'),
        max_tds: form.get('max_tds'),
      };


      await addPlantAPI(token, data);

      navigate('/plant');
    } catch (error) {
      setError(error.response.data?.message);
    }
  };

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
            <h1 className="text-2xl font-bold mb-3 pl-5">Create Plant</h1>

            <form onSubmit={submitHandler}>
              <div className="w-full flex flex-col gap-5 bg-white rounded-lg shadow pt-6 px-12 pb-16">
                <div className="mb-4">{error && <Alert>{error}</Alert>}</div>

                <div className="relative w-full">
                  <label htmlFor="required-name" className="text-gray-700">
                    Name
                    <span className="text-red-500 required-dot">*</span>
                  </label>
                  <input
                    type="text"
                    id="required-name"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    name="name"
                    placeholder="Plant Name"
                  />
                </div>

                <div className="relative w-full flex gap-3">
                  <div className="w-1/2">
                    <label htmlFor="required-min_ph" className="text-gray-700">
                      Min Ph
                      <span className="text-red-500 required-dot">*</span>
                    </label>
                    <input
                      type="number"
                      id="required-min_ph"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      name="min_ph"
                      placeholder="Min Ph"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="required-max_ph" className="text-gray-700">
                      Max Ph
                      <span className="text-red-500 required-dot">*</span>
                    </label>
                    <input
                      type="number"
                      id="required-max_ph"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      name="max_ph"
                      placeholder="Max Ph"
                    />
                  </div>
                </div>

                <div className="relative w-full flex gap-3">
                  <div className="w-1/2">
                    <label htmlFor="required-min_tds" className="text-gray-700">
                      Min TDS
                      <span className="text-red-500 required-dot">*</span>
                    </label>
                    <input
                      type="number"
                      id="required-min_tds"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      name="min_tds"
                      placeholder="Min TDS"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="required-max_tds" className="text-gray-700">
                      Max TDS
                      <span className="text-red-500 required-dot">*</span>
                    </label>
                    <input
                      type="number"
                      id="required-max_tds"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      name="max_tds"
                      placeholder="Max TDS"
                    />
                  </div>
                </div>

                <div className="relative w-full flex gap-3">
                  <div className="w-1/2">
                    <label htmlFor="required-min_ec" className="text-gray-700">
                      Min EC
                      <span className="text-red-500 required-dot">*</span>
                    </label>
                    <input
                      type="number"
                      id="required-min_ec"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      name="min_ec"
                      placeholder="Min EC"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="required-max_ec" className="text-gray-700">
                      Max EC
                      <span className="text-red-500 required-dot">*</span>
                    </label>
                    <input
                      type="number"
                      id="required-max_ec"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      name="max_ec"
                      placeholder="Max EC"
                    />
                  </div>
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

export default CreatePlant;
