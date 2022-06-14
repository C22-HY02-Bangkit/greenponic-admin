import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import DataTable from 'react-data-table-component';
import { useAuth } from '../hooks/useAuth';
import { getUsersAPI } from '../utils/http';

const User = () => {
  const { token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    {
      name: 'Full Name',
      selector: (row) => row.fullname,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Phone Number',
      selector: (row) =>
        row?.detail?.phone_number || <div className="text-gray-400">-</div>,
    },
    {
      name: 'Province',
      selector: (row) =>
        row?.detail?.province?.name || <div className="text-gray-400">-</div>,
    },
    {
      name: 'Address',
      selector: (row) =>
        row?.detail?.address || <div className="text-gray-400">-</div>,
    },
    {
      name: 'Total Devices',
      selector: (row) =>
        row?.devices.length || <div className="text-gray-400">0</div>,
    },
    {
      cell: (row) => (
        <Link to={`/user/detail/${row.id}`}>
          <button className="text-blue-600 border p-2 ">detail</button>
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    const http = async () => {
      const users = await getUsersAPI(token);
      console.log(users);
      setData(users);
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
            <DataTable title="Users" columns={columns} data={data} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default User;
