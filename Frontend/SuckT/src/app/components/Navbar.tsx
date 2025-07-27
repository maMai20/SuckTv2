import { useState } from 'react';
import styles from '../styles/Navbar.module.css';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <button className={styles.menuButton} onClick={toggleSidebar}>
        ☰
      </button>
      <h1 className={styles.title}>My App</h1>
    </nav>
  );
};

export default Navbar;
