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
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TimerIcon from '@mui/icons-material/Timer';
import ChatIcon from '@mui/icons-material/Chat';

import styles from '../../styles/ka.module.css';

// --- Data ---
const menuItemsPrimary = [
  { text: 'Calendar', icon: <CalendarMonthIcon /> },
  { text: 'To do List', icon: <ListAltIcon /> },
  { text: 'Timer', icon: <TimerIcon /> },
  { text: 'Chat', icon: <ChatIcon /> },
];

const menuItemsSecondary = [
  { text: 'Logout', icon: <LogoutIcon /> },
];

// --- Sub-components ---

// Component สำหรับแสดงรายการเมนูใน Drawer
const DrawerContent = ({
  onClose,
}: {
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}) => (
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
      {menuItemsPrimary.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {menuItemsSecondary.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
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
        <MenuItem onClick={handleMenuClose}>Login</MenuItem>
      </Menu>
    </>
  );
};

// --- Main Component ---
export default function ModernAppBarDrawer() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const auth = true; // สามารถเปลี่ยนเป็น state หรือ prop ได้

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
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
      <AppBar
        position="sticky"
        className={styles.appBarCustom}
        elevation={4}
      >
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
