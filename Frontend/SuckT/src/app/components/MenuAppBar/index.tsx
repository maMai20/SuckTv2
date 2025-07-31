'use client';

import * as React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Drawer from '@mui/material/Drawer';


import styles from './style.module.css'; 

// --- Data ---
const menuItemsPrimary = ['Calendar', 'To do List', 'Timer', 'Chat'];
const menuItemsSecondary = ['Logout'];

// --- Sub-components ---

// Component สำหรับแสดงรายการเมนูใน Drawer
const DrawerContent = ({ onClose }: { onClose: () => void }) => (
  <Box
    className={styles.drawerContainer}
    role="presentation"
    onClick={onClose}
    onKeyDown={onClose}
  >
    <Typography variant="h6" className={styles.drawerTitle}>
      Menu
    </Typography>
    <Divider />
    <List>
      {menuItemsPrimary.map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon className={styles.iconPrimary} /> : <MailIcon className={styles.iconSecondary} />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {menuItemsSecondary.map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon className={styles.iconPrimary} /> : <MailIcon className={styles.iconSecondary} />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

// Component สำหรับเมนูโปรไฟล์
const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account menu"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ elevation: 3, className: styles.menuPaper }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};


// --- Main Component ---
export default function ModernAppBarDrawer() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const auth = true; // สามารถเปลี่ยนเป็น state หรือ prop ได้

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      {/* vvv แก้ไขส่วนนี้ vvv */}
      <AppBar 
        position="sticky" 
        className={styles.appBarCustom} /* 1. เพิ่ม className ที่นี่ */
        elevation={4}
        /* 2. ลบ color="primary" ออกไป */
      >
      {/* ^^^ แก้ไขส่วนนี้ ^^^ */}
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            size="large"
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" className={styles.title}>
            SuckT
          </Typography>

          {auth && <ProfileMenu />}
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <DrawerContent onClose={toggleDrawer(false)} />
      </SwipeableDrawer>
    </>
  );
}