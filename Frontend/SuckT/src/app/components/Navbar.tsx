import React from 'react';

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav style={{ height: '60px', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
      <button onClick={toggleSidebar} style={{ fontSize: '24px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
        &#9776; {/* icon bar 3 ขีด */}
      </button>
      <h1 style={{ marginLeft: '1rem' }}>My App</h1>
    </nav>
  );
};

export default Navbar;
