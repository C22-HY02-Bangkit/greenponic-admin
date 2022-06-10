import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import DataTable from 'react-data-table-component';
import { useAuth } from '../hooks/useAuth';
import { deleteProductAPI, getProductsAPI } from '../utils/http';

const Product = () => {
  const { token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.title,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
    },
    {
      name: 'Price',
      selector: (row) => 'Rp. ' + row.price,
    },
    {
      cell: (row) => (
        <>
          <Link to={`/product/edit/${row.id}`}>
            <button className="text-green-500 border p-2 ">edit</button>
          </Link>
          <button
            className="text-red-500 border p-2 ml-1"
            onClick={deleteHandler(row.id)}
          >
            delete
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '150px',
    },
  ];

  const deleteHandler = (id) => async (e) => {
    e.preventDefault();

    if (!confirm('Are sure?')) return;

    await deleteProductAPI(token, id);

    alert('Delete product success!');
    window.location.reload();
  };

  useEffect(() => {
    const http = async () => {
      const products = await getProductsAPI(token);
      console.log(products);
      setData(products);
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
            {/* main content */}
            {/* <h1 className='text-4xl text-gray-800 mb-3 text-center font-bold'>Device</h1> */}
            <DataTable
              title="Products"
              columns={columns}
              data={data}
              actions={
                <Link to="/product/create">
                  <button className="font-semibold text-gray-500 p-2 border text-sm">
                    ADD
                  </button>
                </Link>
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Product;
