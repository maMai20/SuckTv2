import React from 'react';
import styles from '../styles/layout.module.css';

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (

    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <ul>
        <li><a href="#"> Home</a></li>
        <li><a href="#"> Calendar</a></li>
        <li><a href="#"> Notes</a></li>
        <li><a href="#"> Settings</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;