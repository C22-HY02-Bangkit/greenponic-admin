import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import DataTable from 'react-data-table-component';
import { useAuth } from '../hooks/useAuth';
import { deleteDeviceAPI, getDevicesAPI } from '../utils/http';

const Device = () => {
  const { token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    {
      name: 'Device ID',
      selector: (row) => row.id,
      grow: 2,
    },
    {
      name: 'Device Name',
      selector: (row) => row?.product?.title,
    },
    {
      name: 'User Name',
      selector: (row) => row?.user.fullname,
    },
    {
      name: 'User email',
      selector: (row) => row?.user.email,
    },
    {
      name: 'Plant Name',
      selector: (row) =>
        row?.planted?.name || <div className="text-gray-400">Empty</div>,
    },
    {
      name: 'Date Created',
      selector: (row) => new Date(row.createdAt).toLocaleDateString('id-ID'),
    },
    {
      cell: (row) => (
        <>
          <Link to={`/device/edit/${row.id}`}>
            <button className="text-green-500 border p-2 mx-1 ">edit</button>
          </Link>
          <button
            className="text-red-500 border p-2 "
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

    await deleteDeviceAPI(token, id);

    alert('Delete device success!');

    // get updated device
    const devices = await getDevicesAPI(token);
    setData(devices);
  };

  useEffect(() => {
    const http = async () => {
      const devices = await getDevicesAPI(token);
      setData(devices);
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
              title="Devices"
              columns={columns}
              data={data}
              actions={
                <Link to="/device/create">
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

export default Device;
