import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  alpha,
  useTheme,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  LocalShipping,
  Speed,
  Security,
  TrendingUp,
  Business,
  People,
  Warehouse,
  FlightTakeoff,
  Assessment,
  ArrowForward,
  Phone,
  Email,
  LocationOn,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../theme/ThemeProvider";

const LandingPage = () => {
  const theme = useTheme();
  const { mode } = useThemeMode();
  const navigate = useNavigate();
  const [trackingTab, setTrackingTab] = useState(0);
  const [trackingValue, setTrackingValue] = useState("");

  const isDark = mode === "dark";

  const services = [
    {
      icon: LocalShipping,
      title: "Express Parcel",
      description: "Fast delivery across India",
    },
    {
      icon: Warehouse,
      title: "Warehousing",
      description: "Secure storage solutions",
    },
    {
      icon: Business,
      title: "Part Truckload",
      description: "Flexible shipping options",
    },
    {
      icon: FlightTakeoff,
      title: "Full Truckload",
      description: "Complete vehicle booking",
    },
    {
      icon: TrendingUp,
      title: "Cross Border",
      description: "International logistics",
    },
    {
      icon: Assessment,
      title: "Data Intelligence",
      description: "Analytics & insights",
    },
  ];

  const stats = [
    {
      icon: People,
      value: "3.4 Bn+",
      label: "Parcels shipped since inception",
    },
    { icon: LocationOn, value: "99.5%", label: "Indian population covered" },
    { icon: Business, value: "33K+", label: "Businesses served" },
    { icon: LocalShipping, value: "6.1 Mn+", label: "Tonnes Freight shipped" },
  ];

  const handleTrack = () => {
    if (trackingValue.trim()) {
      navigate(`/tracking?id=${trackingValue}`);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: isDark ? "background.default" : "background.default",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        m: 0,
        p: 0,
      }}
    >
      {/* Header Navigation */}
      <Box
        sx={{
          bgcolor: isDark ? "#0a0e1a" : "#1976d2",
          color: "white",
          py: 2,
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: isDark
            ? "0 4px 12px rgba(0,0,0,0.5)"
            : "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${alpha("#ffffff", 0.1)}`,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                background: isDark
                  ? "linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Logistics Platform
            </Typography>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Typography
                onClick={() => {
                  document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  transition: "all 0.2s",
                  "&:hover": {
                    color: isDark ? "#e63946" : "#ff6f00",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Services
              </Typography>
              <Typography
                onClick={() => {
                  document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  transition: "all 0.2s",
                  "&:hover": {
                    color: isDark ? "#e63946" : "#ff6f00",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Solutions
              </Typography>
              <Typography
                onClick={() => {
                  document.getElementById('tracking-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  transition: "all 0.2s",
                  "&:hover": {
                    color: isDark ? "#e63946" : "#ff6f00",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Track
              </Typography>
              <Typography
                onClick={() => {
                  document.getElementById('footer-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  transition: "all 0.2s",
                  "&:hover": {
                    color: isDark ? "#e63946" : "#ff6f00",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Support
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  bgcolor: isDark ? "#e63946" : "#ff6f00",
                  color: "white",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: isDark
                    ? "0 4px 12px rgba(230, 57, 70, 0.3)"
                    : "0 4px 12px rgba(255, 111, 0, 0.3)",
                  transition: "all 0.3s",
                  "&:hover": {
                    bgcolor: isDark ? "#ff4d5a" : "#ff8c00",
                    transform: "translateY(-2px)",
                    boxShadow: isDark
                      ? "0 6px 16px rgba(230, 57, 70, 0.4)"
                      : "0 6px 16px rgba(255, 111, 0, 0.4)",
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background: isDark
            ? "linear-gradient(135deg, #0a0e1a 0%, #1a1d29 50%, #0a0e1a 100%)"
            : "linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #42a5f5 100%)",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDark
              ? "radial-gradient(circle at 30% 50%, rgba(230, 57, 70, 0.1) 0%, transparent 50%)"
              : "radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        {/* Animated Background Circles */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: alpha(isDark ? "#e63946" : "#ffffff", 0.1),
            filter: "blur(80px)",
            animation: "float 8s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
              "50%": { transform: "translateY(-30px) translateX(30px)" },
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: alpha(isDark ? "#e63946" : "#ffffff", 0.08),
            filter: "blur(100px)",
            animation: "float 10s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={7}>
              <Typography
                variant="h1"
                sx={{
                  color: "white",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                We are India's largest fully integrated{" "}
                <Box
                  component="span"
                  sx={{
                    color: isDark ? "#e63946" : "#ff6f00",
                    display: "inline",
                  }}
                >
                  logistics services
                </Box>{" "}
                provider
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: alpha("#ffffff", 0.9),
                  mb: 4,
                  fontWeight: 400,
                }}
              >
                Express Parcel • PTL • FTL • Cross Border • Supply Chain
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate("/register")}
                  sx={{
                    background: isDark
                      ? "linear-gradient(135deg, #e63946 0%, #ff4d5a 100%)"
                      : "linear-gradient(135deg, #ff6f00 0%, #ff8c00 100%)",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: "none",
                    boxShadow: isDark
                      ? "0 6px 20px rgba(230, 57, 70, 0.4)"
                      : "0 6px 20px rgba(255, 111, 0, 0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: isDark
                        ? "0 8px 25px rgba(230, 57, 70, 0.5)"
                        : "0 8px 25px rgba(255, 111, 0, 0.5)",
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    borderWidth: 2,
                    color: "white",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: "none",
                    backdropFilter: "blur(10px)",
                    bgcolor: alpha("#ffffff", 0.05),
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: "white",
                      bgcolor: alpha("#ffffff", 0.15),
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>

            {/* Right - Tracking Widget */}
            <Grid item xs={12} md={5} id="tracking-section">
              <Card
                sx={{
                  bgcolor: isDark
                    ? "rgba(26, 29, 41, 0.95)"
                    : "rgba(255,255,255,0.98)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 4,
                  boxShadow: isDark
                    ? "0 12px 40px rgba(0,0,0,0.6)"
                    : "0 12px 40px rgba(0,0,0,0.15)",
                  overflow: "hidden",
                  border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: isDark
                      ? "0 16px 50px rgba(230, 57, 70, 0.3)"
                      : "0 16px 50px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    background: isDark
                      ? "linear-gradient(135deg, #e63946 0%, #c62828 100%)"
                      : "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                    color: "white",
                    py: 2.5,
                    px: 3,
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ letterSpacing: "-0.5px" }}
                  >
                    Track your order
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Tabs
                    value={trackingTab}
                    onChange={(e, newValue) => setTrackingTab(newValue)}
                    sx={{
                      mb: 3,
                      "& .MuiTab-root": {
                        color: isDark ? "#b0b3b8" : "text.secondary",
                        fontWeight: 600,
                        minWidth: "auto",
                        px: 2,
                      },
                      "& .Mui-selected": {
                        color: isDark ? "#e63946" : "primary.main",
                      },
                    }}
                  >
                    <Tab label="Mobile" />
                    <Tab label="AWB" />
                    <Tab label="Order Id" />
                    <Tab label="LRN" />
                  </Tabs>

                  <TextField
                    fullWidth
                    placeholder={
                      trackingTab === 0
                        ? "Enter your mobile number"
                        : trackingTab === 1
                        ? "Enter AWB number"
                        : trackingTab === 2
                        ? "Enter Order ID"
                        : "Enter LRN"
                    }
                    value={trackingValue}
                    onChange={(e) => setTrackingValue(e.target.value)}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        bgcolor: isDark ? "#2d3139" : "background.paper",
                      },
                    }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleTrack}
                    sx={{
                      background: isDark
                        ? "linear-gradient(135deg, #e63946 0%, #c62828 100%)"
                        : "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 700,
                      borderRadius: 2,
                      textTransform: "none",
                      boxShadow: isDark
                        ? "0 4px 12px rgba(230, 57, 70, 0.4)"
                        : "0 4px 12px rgba(25, 118, 210, 0.4)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: isDark
                          ? "0 6px 16px rgba(230, 57, 70, 0.5)"
                          : "0 6px 16px rgba(25, 118, 210, 0.5)",
                      },
                    }}
                  >
                    Get OTP & Track
                  </Button>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Live tracking updates & extra support on our App
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          py: { xs: 6, sm: 8 },
          bgcolor: isDark ? "#1a1d29" : "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
              px: { xs: 2, sm: 0 },
              color: isDark ? "white" : "text.primary",
            }}
          >
            Flexibility, Reliability and Scale
          </Typography>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
              px: { xs: 2, sm: 0 },
              color: isDark ? "white" : "text.primary",
            }}
          >
            The Answer is{" "}
            <Box
              component="span"
              sx={{ color: isDark ? "#e63946" : "primary.main" }}
            >
              Logistics Platform
            </Box>
          </Typography>
          <Box
            sx={{
              width: { xs: 60, sm: 100 },
              height: 4,
              bgcolor: isDark ? "#e63946" : "primary.main",
              mx: "auto",
              mb: { xs: 4, sm: 6 },
              borderRadius: 2,
            }}
          />

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    p: { xs: 2, sm: 3 },
                    height: "100%",
                    bgcolor: isDark ? "#2d3139" : "background.paper",
                    border: isDark ? "1px solid #3a3f4b" : "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: {
                        xs: "translateY(-4px)",
                        sm: "translateY(-8px)",
                      },
                      boxShadow: isDark
                        ? "0 12px 40px rgba(230,57,70,0.3)"
                        : "0 12px 40px rgba(25,118,210,0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 50, sm: 64, md: 80 },
                      height: { xs: 50, sm: 64, md: 80 },
                      borderRadius: "50%",
                      bgcolor: isDark
                        ? alpha("#e63946", 0.2)
                        : alpha(theme.palette.primary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: { xs: 1.5, sm: 2 },
                    }}
                  >
                    <stat.icon
                      sx={{
                        fontSize: { xs: 28, sm: 36, md: 40 },
                        color: isDark ? "#e63946" : "primary.main",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      mb: { xs: 0.5, sm: 1 },
                      fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                      color: isDark ? "#e63946" : "primary.main",
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDark ? "#b0b3b8" : "text.secondary",
                      fontWeight: 500,
                      fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box
        id="services-section"
        sx={{
          py: { xs: 6, sm: 8 },
          bgcolor: isDark ? "#0a0e1a" : "background.default",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              mb: { xs: 4, sm: 6 },
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
              px: { xs: 2, sm: 0 },
              color: isDark ? "white" : "text.primary",
            }}
          >
            Our Services
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    p: { xs: 2.5, sm: 3 },
                    height: "100%",
                    bgcolor: isDark ? "#1a1d29" : "background.paper",
                    border: isDark ? "1px solid #3a3f4b" : "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: {
                        xs: "translateY(-4px)",
                        sm: "translateY(-8px)",
                      },
                      bgcolor: isDark ? "#2d3139" : "background.paper",
                      boxShadow: isDark
                        ? "0 8px 32px rgba(230,57,70,0.2)"
                        : "0 8px 32px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <service.icon
                    sx={{
                      fontSize: { xs: 40, sm: 48 },
                      color: isDark ? "#e63946" : "primary.main",
                      mb: { xs: 1.5, sm: 2 },
                    }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      mb: 1,
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                      color: isDark ? "white" : "text.primary",
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "0.875rem" },
                      color: isDark ? "#b0b3b8" : "text.secondary",
                    }}
                  >
                    {service.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 6, sm: 8 },
          background: isDark
            ? "linear-gradient(135deg, #1a1d29 0%, #e63946 100%)"
            : "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            fontWeight={700}
            mb={2}
            sx={{
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
              px: { xs: 2, sm: 0 },
            }}
          >
            Ready to transform your logistics?
          </Typography>
          <Typography
            variant="h6"
            mb={4}
            sx={{
              opacity: 0.9,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              px: { xs: 2, sm: 0 },
            }}
          >
            Join thousands of businesses using our platform
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/register")}
            sx={{
              bgcolor: "white",
              color: isDark ? "#e63946" : "primary.main",
              px: { xs: 4, sm: 6 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: "1rem", sm: "1.125rem" },
              fontWeight: 600,
              "&:hover": {
                bgcolor: alpha("#ffffff", 0.9),
                transform: "scale(1.05)",
              },
            }}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        id="footer-section"
        sx={{
          py: { xs: 4, sm: 6 },
          bgcolor: isDark ? "#1a1d29" : "background.paper",
          borderTop: isDark ? "1px solid #3a3f4b" : "1px solid #e0e0e0",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, sm: 4 }}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
                sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}
              >
                Logistics Platform
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
                sx={{ fontSize: { xs: "0.875rem", sm: "0.875rem" } }}
              >
                India's largest fully integrated logistics services provider
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                ISO 9001: 2015, ISO 27001: 2022 Certified Company
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography
                variant="h6"
                fontWeight={600}
                mb={2}
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                Services
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={1}
                sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
              >
                Express Parcel
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={1}
                sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
              >
                Warehousing
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={1}
                sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
              >
                Full Truckload
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography
                variant="h6"
                fontWeight={600}
                mb={2}
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                Company
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={1}
                sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
              >
                About Us
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={1}
                sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
              >
                Careers
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={1}
                sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
              >
                Contact
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                variant="h6"
                fontWeight={600}
                mb={2}
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                Get in Touch
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Phone
                  sx={{
                    fontSize: { xs: 16, sm: 18 },
                    mr: 1,
                    color: isDark ? "#e63946" : "primary.main",
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
                >
                  +91 80698 56101
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Email
                  sx={{
                    fontSize: { xs: 16, sm: 18 },
                    mr: 1,
                    color: isDark ? "#e63946" : "primary.main",
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
                >
                  support@logistics.com
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              mt: { xs: 3, sm: 4 },
              pt: { xs: 3, sm: 4 },
              borderTop: "1px solid",
              borderColor: "divider",
              textAlign: "center",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              © 2025 Logistics Platform. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
