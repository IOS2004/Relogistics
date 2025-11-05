import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Toolbar,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  LocalShipping as LocalShippingIcon,
  DirectionsCar as DirectionsCarIcon,
  TrackChanges as TrackChangesIcon,
  Payment as PaymentIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
    divider: false,
  },
  {
    text: "Loads",
    icon: <LocalShippingIcon />,
    path: "/loads",
    divider: false,
  },
  {
    text: "Vehicles",
    icon: <DirectionsCarIcon />,
    path: "/vehicles",
    divider: false,
  },
  {
    text: "Tracking",
    icon: <TrackChangesIcon />,
    path: "/tracking",
    divider: false,
  },
  { text: "Payments", icon: <PaymentIcon />, path: "/payments", divider: true },
  {
    text: "Reports",
    icon: <AssessmentIcon />,
    path: "/reports",
    divider: false,
  },
  { text: "Profile", icon: <PersonIcon />, path: "/profile", divider: false },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
    divider: false,
  },
];

const Sidebar = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          ...(!open && {
            width: (theme) => theme.spacing(7),
            overflowX: "hidden",
          }),
        },
      }}
      open={open}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              {item.divider && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
