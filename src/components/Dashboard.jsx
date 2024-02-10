import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Box,
  CssBaseline,
  Divider,
} from "@mui/material";
import ProductList from "./ProductsList";
import Profile from "./Profile/Profile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Profile");
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = (menu) => {
    setSelectedMenu(menu);
    setOpen(false);
  };

  const renderMenu = () => {
    if (selectedMenu === "Profile") {
      return <Profile />;
    } else if (selectedMenu === "Products") {
      return <ProductList />;
    }
  };

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleMenuToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>

          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <Typography variant="caption">
            Welcome, {user?.displayName}
          </Typography>
          <IconButton sx={{ color: "white", ml: 2 }} onClick={handleLogout}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={open} onClose={handleMenuToggle}>
        <List>
          {["Profile", "Products"].map((menu, index) => (
            <ListItem
              button
              key={menu}
              selected={selectedMenu === menu}
              onClick={() => handleMenuItemClick(menu)}
              sx={{ mr: 1, mt: 1, mb: 1 }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <AccountCircleIcon /> : <Inventory2Icon />}
              </ListItemIcon>
              <ListItemText primary={menu} />
            </ListItem>
          ))}

          <Divider></Divider>
          <ListItem
            button
            key="Logout"
            onClick={handleLogout}
            sx={{ mr: 1, mt: 1, mb: 1 }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Box sx={{ mt: 5 }}>{renderMenu()}</Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
