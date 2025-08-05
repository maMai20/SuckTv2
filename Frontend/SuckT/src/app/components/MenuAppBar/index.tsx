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
  CssBaseline,
} from '@mui/material';

import {
  Menu as MenuIcon,
  AccountCircle,
  Logout as LogoutIcon,
  CalendarMonth as CalendarMonthIcon,
  ListAlt as ListAltIcon,
  Timer as TimerIcon,
  Chat as ChatIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
} from '@mui/icons-material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import styles from '../../styles/ka.module.css';

// --- Data ---
const menuItemsPrimary = [
  { text: 'Calendar', icon: <CalendarMonthIcon /> },
  { text: 'To do List', icon: <ListAltIcon /> },
  { text: 'Timer', icon: <TimerIcon /> },
  { text: 'Chat', icon: <ChatIcon /> },
];

const menuItemsSecondary = [{ text: 'Logout', icon: <LogoutIcon /> }];

// --- Sub-components ---
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

// --- Profile Menu Component ---
const ProfileMenu = ({
  onToggleTheme,
  currentMode,
}: {
  onToggleTheme: () => void;
  currentMode: 'light' | 'dark';
}) => {
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
        <MenuItem
          onClick={() => {
            onToggleTheme();
            handleMenuClose();
          }}
        >
          {currentMode === 'dark' ? (
            <>
              <LightIcon fontSize="small" style={{ marginRight: 8 }} />
              Light Mode
            </>
          ) : (
            <>
              <DarkIcon fontSize="small" style={{ marginRight: 8 }} />
              Dark Mode
            </>
          )}
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Login</MenuItem>
      </Menu>
    </>
  );
};

// --- Main Component ---
export default function ModernAppBarDrawer() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  // อ่านค่าจาก localStorage (จำค่าธีมที่เลือกไว้)
  React.useEffect(() => {
    const saved = localStorage.getItem('themeMode');
    if (saved === 'light' || saved === 'dark') {
      setMode(saved);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
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

          <ProfileMenu onToggleTheme={toggleTheme} currentMode={mode} />
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
    </ThemeProvider>
  );
}
