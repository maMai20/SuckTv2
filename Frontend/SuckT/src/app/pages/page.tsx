"use client";

import Image from "next/image";
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const HomePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar isOpen={sidebarOpen} />
      <div style={{ flex: 1 }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <main style={{ padding: '1rem' }}>
          <h2>Welcome to the app</h2>
          <p>This is the homepage content.</p>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
