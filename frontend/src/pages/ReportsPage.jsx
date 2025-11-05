import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  PictureAsPdf,
  TableChart,
  TrendingUp,
  LocalShipping,
  AttachMoney,
} from "@mui/icons-material";
import RevenueChart from "../components/charts/RevenueChart";
import DeliveryStatusChart from "../components/charts/DeliveryStatusChart";
import VehicleTypeBarChart from "../components/charts/VehicleTypeBarChart";
import { useIsMobile } from "../hooks/useMediaQuery";

const ReportsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [timePeriod, setTimePeriod] = useState("month");
  const isMobile = useIsMobile();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const reportStats = [
    {
      title: "Total Revenue",
      value: "₹1,25,000",
      change: "+15%",
      icon: AttachMoney,
      color: "success.main",
    },
    {
      title: "Total Deliveries",
      value: "156",
      change: "+23%",
      icon: LocalShipping,
      color: "info.main",
    },
    {
      title: "Active Vehicles",
      value: "24",
      change: "+8%",
      icon: TrendingUp,
      color: "warning.main",
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Reports & Analytics
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: { xs: 2, md: 3 },
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          View detailed reports and export data
        </Typography>

        {/* Export Buttons */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={<PictureAsPdf />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Export PDF
          </Button>
          <Button
            variant="outlined"
            startIcon={<TableChart />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Export Excel
          </Button>
        </Box>
      </Box>

      {/* Time Period Filter */}
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Time Period</InputLabel>
          <Select
            value={timePeriod}
            label="Time Period"
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="quarter">This Quarter</MenuItem>
            <MenuItem value="year">This Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {reportStats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(26, 29, 41, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.95) 100%)",
                backdropFilter: "blur(10px)",
                border: (theme) =>
                  `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)"
                  }`,
                borderRadius: 3,
                height: "100%",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: stat.color,
                      color: "white",
                      mr: 2,
                    }}
                  >
                    <stat.icon />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="success.main">
                  {stat.change} from last period
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs for Different Reports */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
            },
          }}
        >
          <Tab label="Revenue" />
          <Tab label="Deliveries" />
          <Tab label="Vehicles" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      {selectedTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(26, 29, 41, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.95) 100%)",
                backdropFilter: "blur(10px)",
                border: (theme) =>
                  `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)"
                  }`,
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Revenue Trends
                </Typography>
                <RevenueChart />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {selectedTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(26, 29, 41, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.95) 100%)",
                backdropFilter: "blur(10px)",
                border: (theme) =>
                  `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)"
                  }`,
                borderRadius: 3,
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Delivery Status
                </Typography>
                <DeliveryStatusChart />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {selectedTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(26, 29, 41, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.95) 100%)",
                backdropFilter: "blur(10px)",
                border: (theme) =>
                  `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)"
                  }`,
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Vehicle Distribution
                </Typography>
                <VehicleTypeBarChart />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ReportsPage;
