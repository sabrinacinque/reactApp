import React, { useState } from 'react';
import { ChevronsRight, ChevronsLeft } from 'lucide-react';
import Sidebar from './Sidebar.jsx';

export default function SidebarWrapper() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  return (
    <>
      {/* Toggle button per mobile/tablet */}
      <div className="d-lg-none">
        <button
          className="btn btn-outline-secondary position-fixed top-50 start-0 translate-middle-y ms-2 bg-dark border border-3 rounded-5"
          type="button"
          onClick={toggleLeftSidebar}
          style={{ zIndex: 1050 }}
        >
          {leftSidebarOpen ? (
            <ChevronsLeft size={30} className="text-white" />
          ) : (
            <ChevronsRight size={30} className="text-white" />
          )}
        </button>

        {/* Sidebar collassabile su mobile/tablet */}
        <div 
          className={`position-fixed top-0 h-100 bg-white shadow ${leftSidebarOpen ? 'start-0' : ''}`}
          style={{
            left: leftSidebarOpen ? 0 : '-300px',
            width: '300px',
            zIndex: 1040,
            transition: 'left 0.3s ease-in-out',
            marginTop: '60px' // per non sovrapporsi all'header
          }}
        >
          <Sidebar />
        </div>

        {/* Overlay per chiudere sidebar su mobile */}
        {leftSidebarOpen && (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1035, marginTop: '60px' }}
            onClick={toggleLeftSidebar}
          ></div>
        )}
      </div>

      {/* Sidebar fissa su desktop */}
      <div className="d-none d-lg-block vh-100" style={{ width: '300px' }}>
        <Sidebar />
      </div>
    </>
  );
}