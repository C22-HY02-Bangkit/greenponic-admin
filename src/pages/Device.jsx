import { useState } from 'react';
import Sidebar from '../partials/Sidebar';

const Device = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <h1>Hello there, this is device</h1>
        </div>
      </div>
    </>
  );
};

export default Device;
