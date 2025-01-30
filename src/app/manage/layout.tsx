'use client';
import { useState, ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Sell, ShoppingCart } from '@mui/icons-material';
import { LayoutProvider, useLayout } from '@/context/LayoutContext';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

const drawerOptions = [
  {
    name: 'Vendas',
    url: '/manage/sales',
    icon: <Sell />
  },
  {
    name: 'Compras',
    url: '/manage/purchases',
    icon: <ShoppingCart />
  }
]


const DrawerContent = () => {
  const router = useRouter();

  const handleLinkClick = (url: string) => {
    router.push(url);
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {drawerOptions.map((option, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleLinkClick(option.url)}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const ResponsiveDrawer = ({ children }: { children?: ReactNode }) => {
  const { toolbarTitle } = useLayout();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {toolbarTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="hubbi management"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          onTransitionEnd={handleDrawerTransitionEnd}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerContent />
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerContent />
        </Drawer>
      </Box>
      {children}
    </Box>
  );
};

export default function Layout({ children }: { children: ReactNode; }) {
  return (
    <LayoutProvider>
      <ResponsiveDrawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
          }}
        >
          <Toolbar />
          {children}
        </Box>

      </ResponsiveDrawer>
    </LayoutProvider>
  );
};
