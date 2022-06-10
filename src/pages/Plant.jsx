import { useState } from 'react';
import Sidebar from '../partials/Sidebar';

const Plant = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <h1>Hello there, this is Plant page</h1>
        </div>
      </div>
    </>
  );
};

export default Plant;
