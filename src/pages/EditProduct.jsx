import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Alert from '../partials/actions/Alert';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { editProductAPI, getProductDetailAPI } from '../utils/http';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const form = new FormData(e.currentTarget);

      const data = {
        title: form.get('title'),
        description: form.get('description'),
        price: form.get('price'),
      };

      await editProductAPI(token, data, id);

      navigate('/product');
    } catch (error) {
      setError(error.response.data?.message);
    }
  };

  useEffect(() => {
    const http = async () => {
      const product = await getProductDetailAPI(token, id);
      console.log('[product]', product);
      setData(product);
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
            <h1 className="text-2xl font-bold mb-3 pl-5">Edit Product</h1>

            <form onSubmit={submitHandler}>
              <div className="w-full flex flex-col gap-5 bg-white rounded-lg shadow pt-6 px-12 pb-16">
                <div className="mb-4">{error && <Alert>{error}</Alert>}</div>

                <div className="relative w-full">
                  <label htmlFor="required-name" className="text-gray-700">
                    Product Name
                    <span className="text-red-500 required-dot">*</span>
                  </label>
                  <input
                    type="text"
                    id="required-name"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    name="title"
                    defaultValue={data?.title}
                    placeholder="Product Name"
                  />
                </div>

                <div className="relative w-full">
                  <label
                    htmlFor="required-description"
                    className="text-gray-700"
                  >
                    Description
                    <span className="text-red-500 required-dot">*</span>
                  </label>
                  <input
                    type="text"
                    id="required-description"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    name="description"
                    defaultValue={data?.description}
                    placeholder="Description"
                  />
                </div>

                <div className="relative w-full">
                  <label htmlFor="required-price" className="text-gray-700">
                    Price
                    <span className="text-red-500 required-dot">*</span>
                  </label>
                  <input
                    type="number"
                    id="required-price"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    name="price"
                    placeholder="Price"
                    defaultValue={data?.price}
                  />
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

export default EditProduct;
