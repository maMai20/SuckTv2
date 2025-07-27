import { useState } from 'react';
import styles from '../styles/Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <ul>
        <li><a href="#">หน้าแรก</a></li>
        <li><a href="#">เกี่ยวกับ</a></li>
        <li><a href="#">ติดต่อ</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
