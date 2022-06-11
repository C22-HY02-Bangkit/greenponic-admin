import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import { getUserDetailAPI } from '../utils/http';

const UserDetail = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const http = async () => {
      const user = await getUserDetailAPI(token, id);
      console.log(user);
      setData(user);
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

            <div className="bg-white w-full shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Detail
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Details and informations about user.
                </p>
              </div>
              <div className="border-t border-gray-200">
                {/* start */}
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data?.fullname}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data?.email}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data?.verify_user ? 'Verified' : 'Unverified'}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone Number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data?.detail?.phone_number || '-'}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Province
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data?.detail?.province || '-'}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data?.detail?.address || '-'}
                    </dd>
                  </div>
                </dl>
                {/* end */}
              </div>
            </div>

            <div className="mt-5 bg-white w-full shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Devices Detail
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Details and information about the Devices owned by the user.
                </p>
                {data?.devices.length ? (
                  <table className="min-w-full leading-normal mt-3">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-5 py-3 border-b text-gray-800  text-left text-sm uppercase font-bold"
                        >
                          Device Name
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 border-b text-gray-800  text-left text-sm uppercase font-bold"
                        >
                          Planted
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.devices.map((device) => (
                        <tr key={device.id}>
                          <td className="px-5 py-5 border-b  text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {device.name}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b  text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {device?.planted?.name || '-'}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <h1 className="mt-6 text-center font-bold text-gray-900 text-md">
                    The user does not have a device yet.
                  </h1>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDetail;
