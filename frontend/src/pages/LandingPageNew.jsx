import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../theme/ThemeProvider";
import ThemeToggle from "../components/common/ThemeToggle";
import {
  LocalShipping,
  TrendingUp,
  Security,
  Speed,
  Public,
  Inventory,
  Timeline,
  FlightTakeoff,
  CheckCircle,
} from "@mui/icons-material";
import { motion, useScroll, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Tilt from "react-parallax-tilt";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, end, duration]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => setHasAnimated(true)}
    >
      {count}
      {suffix}
    </motion.div>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

const LandingPageNew = () => {
  const navigate = useNavigate();
  const { mode } = useThemeMode();
  const isDark = mode === "dark";
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseTrail, setMouseTrail] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    // Smooth scroll
    document.documentElement.style.scrollBehavior = "smooth";

    AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
      easing: "ease-out-cubic",
    });

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });

      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Create trail effect
      setMouseTrail((prev) => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ]);
    };

    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      const scrollPos = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const features = [
    {
      icon: Speed,
      title: "Lightning Fast",
      description: "Real-time tracking with instant updates",
      color: "#3b82f6",
      delay: 0,
    },
    {
      icon: Security,
      title: "100% Secure",
      description: "End-to-end encrypted shipments",
      color: "#10b981",
      delay: 100,
    },
    {
      icon: Public,
      title: "Global Reach",
      description: "Deliver anywhere in the world",
      color: "#f59e0b",
      delay: 200,
    },
    {
      icon: TrendingUp,
      title: "Analytics",
      description: "Advanced insights and reporting",
      color: "#8b5cf6",
      delay: 300,
    },
  ];

  const services = [
    {
      icon: LocalShipping,
      title: "Express Delivery",
      description: "Same-day and next-day delivery options",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      icon: FlightTakeoff,
      title: "Air Freight",
      description: "International air cargo services",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      icon: Inventory,
      title: "Warehousing",
      description: "Secure storage and inventory management",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      icon: Timeline,
      title: "Supply Chain",
      description: "End-to-end supply chain solutions",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  const stats = [
    { value: "10K+", label: "Daily Shipments", icon: LocalShipping },
    { value: "500+", label: "Cities Covered", icon: Public },
    { value: "98%", label: "On-Time Delivery", icon: CheckCircle },
    { value: "50K+", label: "Happy Clients", icon: TrendingUp },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: isDark
          ? "#0a0e1a"
          : "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
        overflow: "hidden",
        position: "relative",
        cursor: "none",
      }}
    >
      {/* Custom Cursor */}
      <motion.div
        animate={{
          x: cursorPosition.x - 20,
          y: cursorPosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `2px solid ${isDark ? "#e63946" : "#1976d2"}`,
          pointerEvents: "none",
          zIndex: 10000,
          mixBlendMode: "difference",
        }}
      />

      {/* Mouse Trail */}
      {mouseTrail.map((trail) => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            top: trail.y - 3,
            left: trail.x - 3,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: isDark ? "#e63946" : "#1976d2",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />
      ))}

      {/* Floating Navigation Dots */}
      <Box
        sx={{
          position: "fixed",
          right: 40,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1000,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 2,
        }}
      >
        {[0, 1, 2, 3, 4].map((dot) => (
          <motion.div
            key={dot}
            whileHover={{ scale: 1.5 }}
            onClick={() => {
              const sections = document.querySelectorAll("[data-section]");
              sections[dot]?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              width: activeSection === dot ? 12 : 8,
              height: activeSection === dot ? 12 : 8,
              borderRadius: "50%",
              background:
                activeSection === dot
                  ? isDark
                    ? "#e63946"
                    : "#1976d2"
                  : isDark
                  ? alpha("#ffffff", 0.3)
                  : alpha("#000000", 0.3),
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          />
        ))}
      </Box>

      {/* Animated Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          zIndex: 0,
          opacity: 0.6,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1000],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: "100%",
              width: 2,
              height: Math.random() * 100 + 50,
              background: isDark
                ? "linear-gradient(180deg, transparent, #e63946, transparent)"
                : "linear-gradient(180deg, transparent, #1976d2, transparent)",
              borderRadius: 2,
            }}
          />
        ))}
      </Box>

      {/* 3D Floating Shapes */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 50 }}
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(230,57,70,0.2) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(25,118,210,0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{
            x: -mousePosition.x,
            y: -mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 30 }}
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </Box>

      {/* Navigation */}
      <Box
        component={motion.div}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backdropFilter: "blur(20px)",
          bgcolor: isDark ? alpha("#1a1d29", 0.8) : alpha("#ffffff", 0.8),
          borderBottom: `1px solid ${
            isDark ? alpha("#ffffff", 0.1) : alpha("#000000", 0.1)
          }`,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 2,
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: isDark
                    ? "linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)"
                    : "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                }}
              >
                LogiFlow
              </Typography>
            </motion.div>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              {["Services", "Solutions", "Track", "About"].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Typography
                    sx={{
                      cursor: "pointer",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: isDark
                        ? alpha("#ffffff", 0.9)
                        : alpha("#000000", 0.8),
                      transition: "color 0.2s",
                      "&:hover": {
                        color: isDark ? "#e63946" : "#1976d2",
                      },
                    }}
                  >
                    {item}
                  </Typography>
                </motion.div>
              ))}
              <ThemeToggle />
              <MagneticButton>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    sx={{
                      background: isDark
                        ? "linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)"
                        : "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                      color: "white",
                      fontWeight: 700,
                      px: 4,
                      py: 1.2,
                      borderRadius: 3,
                      textTransform: "none",
                      boxShadow: isDark
                        ? "0 8px 32px rgba(230, 57, 70, 0.4)"
                        : "0 8px 32px rgba(25, 118, 210, 0.3)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: isDark
                          ? "0 16px 48px rgba(230, 57, 70, 0.6)"
                          : "0 16px 48px rgba(25, 118, 210, 0.5)",
                      },
                      transition: "all 0.3s",
                    }}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </MagneticButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        data-section
        component={motion.div}
        style={{ opacity, scale }}
        sx={{
          position: "relative",
          pt: { xs: 15, md: 20 },
          pb: { xs: 10, md: 15 },
          zIndex: 1,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                    fontWeight: 900,
                    lineHeight: 1.1,
                    mb: 3,
                    background: isDark
                      ? "linear-gradient(135deg, #ffffff 0%, #e63946 100%)"
                      : "linear-gradient(135deg, #1a1d29 0%, #1976d2 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Future of
                  <br />
                  Logistics
                  <br />
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      background: isDark
                        ? "linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)"
                        : "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Delivered
                  </motion.span>
                </Typography>
              </motion.div>

              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 5,
                    color: isDark
                      ? alpha("#ffffff", 0.7)
                      : alpha("#000000", 0.7),
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    fontWeight: 500,
                  }}
                >
                  Seamless, intelligent, and lightning-fast logistics solutions
                  for the modern world
                </Typography>
              </motion.div>

              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                  <MagneticButton>
                    <Button
                      variant="contained"
                      size="large"
                      component={motion.button}
                      whileHover={{ scale: 1.1, y: -8 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigate("/register")}
                      sx={{
                        px: 5,
                        py: 2,
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        borderRadius: 3,
                        textTransform: "none",
                        background: isDark
                          ? "linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)"
                          : "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                        boxShadow: isDark
                          ? "0 12px 40px rgba(230, 57, 70, 0.4)"
                          : "0 12px 40px rgba(25, 118, 210, 0.3)",
                        "&:hover": {
                          boxShadow: isDark
                            ? "0 20px 60px rgba(230, 57, 70, 0.6)"
                            : "0 16px 50px rgba(25, 118, 210, 0.4)",
                        },
                      }}
                    >
                      Start Shipping Now
                    </Button>
                  </MagneticButton>
                  <MagneticButton>
                    <Button
                      variant="outlined"
                      size="large"
                      component={motion.button}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      sx={{
                        px: 5,
                        py: 2,
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        borderRadius: 3,
                        textTransform: "none",
                        borderWidth: 2,
                        borderColor: isDark ? "#e63946" : "#1976d2",
                        color: isDark ? "#e63946" : "#1976d2",
                        "&:hover": {
                          borderWidth: 2,
                          bgcolor: isDark
                            ? alpha("#e63946", 0.1)
                            : alpha("#1976d2", 0.1),
                        },
                      }}
                    >
                      Watch Demo
                    </Button>
                  </MagneticButton>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                style={{ y: y1 }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  scale={1.05}
                  transitionSpeed={2000}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 500,
                      borderRadius: 6,
                      background: isDark
                        ? "linear-gradient(135deg, #1a1d29 0%, #0a0e1a 100%)"
                        : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                      boxShadow: isDark
                        ? "0 30px 80px rgba(0,0,0,0.6)"
                        : "0 30px 80px rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      border: `2px solid ${
                        isDark ? alpha("#e63946", 0.3) : alpha("#1976d2", 0.3)
                      }`,
                    }}
                  >
                    {/* Animated Delivery Truck */}
                    <motion.div
                      animate={{
                        x: [0, 60, 0],
                        y: [0, -25, 0],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <LocalShipping
                          sx={{
                            fontSize: 220,
                            color: isDark ? "#e63946" : "#1976d2",
                            filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.4))",
                          }}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Animated Road Lines */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`road-${i}`}
                        animate={{
                          x: [-100, 500],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "linear",
                        }}
                        style={{
                          position: "absolute",
                          bottom: 100 + i * 30,
                          left: 0,
                          width: 60,
                          height: 4,
                          background: isDark
                            ? alpha("#e63946", 0.3)
                            : alpha("#1976d2", 0.3),
                          borderRadius: 2,
                        }}
                      />
                    ))}

                    {/* Floating Particles */}
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -100, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: Math.random() * 3 + 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                        style={{
                          position: "absolute",
                          left: `${Math.random() * 100}%`,
                          bottom: 0,
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: isDark ? "#e63946" : "#1976d2",
                        }}
                      />
                    ))}
                  </Box>
                </Tilt>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container
        data-section
        maxWidth="xl"
        sx={{ position: "relative", zIndex: 1, py: 8 }}
      >
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.5 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ y: -15, scale: 1.05 }}
              >
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  scale={1.08}
                  transitionSpeed={800}
                  glareEnable={true}
                  glareMaxOpacity={0.3}
                  glareColor={isDark ? "#e63946" : "#1976d2"}
                  glarePosition="all"
                >
                  <Card
                    sx={{
                      p: 4,
                      textAlign: "center",
                      background: isDark
                        ? `linear-gradient(135deg, ${alpha(
                            "#1a1d29",
                            0.9
                          )} 0%, ${alpha("#0a0e1a", 0.9)} 100%)`
                        : `linear-gradient(135deg, ${alpha(
                            "#ffffff",
                            0.95
                          )} 0%, ${alpha("#f8fafc", 0.95)} 100%)`,
                      backdropFilter: "blur(30px)",
                      border: `2px solid ${
                        isDark ? alpha("#e63946", 0.3) : alpha("#1976d2", 0.3)
                      }`,
                      borderRadius: 5,
                      boxShadow: isDark
                        ? "0 25px 70px rgba(230, 57, 70, 0.2)"
                        : "0 25px 70px rgba(25, 118, 210, 0.2)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        borderColor: isDark ? "#e63946" : "#1976d2",
                        boxShadow: isDark
                          ? "0 35px 90px rgba(230, 57, 70, 0.4)"
                          : "0 35px 90px rgba(25, 118, 210, 0.4)",
                        "&::before": {
                          opacity: 1,
                        },
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: isDark
                          ? "radial-gradient(circle at center, rgba(230, 57, 70, 0.1) 0%, transparent 70%)"
                          : "radial-gradient(circle at center, rgba(25, 118, 210, 0.1) 0%, transparent 70%)",
                        opacity: 0,
                        transition: "opacity 0.4s",
                      },
                    }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon
                        sx={{
                          fontSize: 60,
                          color: isDark ? "#e63946" : "#1976d2",
                          mb: 2,
                          position: "relative",
                          zIndex: 1,
                          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
                        }}
                      />
                    </motion.div>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        mb: 1,
                        background: isDark
                          ? "linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)"
                          : "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <AnimatedCounter
                        end={parseInt(stat.value.replace(/[^0-9]/g, ""))}
                        suffix={stat.value.replace(/[0-9]/g, "")}
                      />
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: isDark
                          ? alpha("#ffffff", 0.8)
                          : alpha("#000000", 0.8),
                        fontWeight: 700,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Card>
                </Tilt>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container
        data-section
        maxWidth="xl"
        sx={{ position: "relative", zIndex: 1, py: 10 }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            data-aos="fade-up"
            sx={{
              textAlign: "center",
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              background: isDark
                ? "linear-gradient(135deg, #ffffff 0%, #e63946 100%)"
                : "linear-gradient(135deg, #1a1d29 0%, #1976d2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Choose Us
          </Typography>
          <Typography
            variant="h6"
            data-aos="fade-up"
            data-aos-delay="100"
            sx={{
              textAlign: "center",
              mb: 8,
              color: isDark ? alpha("#ffffff", 0.7) : alpha("#000000", 0.7),
            }}
          >
            Cutting-edge features that set us apart
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -15 }}
              >
                <Card
                  data-aos="zoom-in"
                  data-aos-delay={feature.delay}
                  sx={{
                    p: 4,
                    height: "100%",
                    textAlign: "center",
                    background: isDark
                      ? alpha("#1a1d29", 0.8)
                      : alpha("#ffffff", 0.9),
                    backdropFilter: "blur(20px)",
                    border: `2px solid ${alpha(feature.color, 0.3)}`,
                    borderRadius: 4,
                    boxShadow: `0 20px 60px ${alpha(feature.color, 0.2)}`,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      borderColor: feature.color,
                      boxShadow: `0 30px 80px ${alpha(feature.color, 0.4)}`,
                      background: isDark
                        ? alpha(feature.color, 0.1)
                        : alpha(feature.color, 0.05),
                    },
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${
                          feature.color
                        } 0%, ${alpha(feature.color, 0.6)} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                        boxShadow: `0 10px 40px ${alpha(feature.color, 0.4)}`,
                      }}
                    >
                      <feature.icon sx={{ fontSize: 40, color: "white" }} />
                    </Box>
                  </motion.div>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, mb: 2, color: feature.color }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDark
                        ? alpha("#ffffff", 0.7)
                        : alpha("#000000", 0.7),
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Services Section */}
      <Box
        data-section
        sx={{
          position: "relative",
          zIndex: 1,
          py: 10,
          mt: 10,
          background: isDark
            ? "linear-gradient(135deg, #1a1d29 0%, #0a0e1a 100%)"
            : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              data-aos="fade-up"
              sx={{
                textAlign: "center",
                fontWeight: 900,
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                background: isDark
                  ? "linear-gradient(135deg, #ffffff 0%, #e63946 100%)"
                  : "linear-gradient(135deg, #1a1d29 0%, #1976d2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Services
            </Typography>
            <Typography
              variant="h6"
              data-aos="fade-up"
              data-aos-delay="100"
              sx={{
                textAlign: "center",
                mb: 8,
                color: isDark ? alpha("#ffffff", 0.7) : alpha("#000000", 0.7),
              }}
            >
              Complete logistics solutions for your business
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                  }}
                >
                  <Tilt
                    tiltMaxAngleX={20}
                    tiltMaxAngleY={20}
                    scale={1.05}
                    transitionSpeed={1000}
                  >
                    <Card
                      data-aos="flip-left"
                      data-aos-delay={index * 100}
                      sx={{
                        p: 4,
                        height: 280,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        background: service.gradient,
                        color: "white",
                        borderRadius: 4,
                        boxShadow: "0 25px 70px rgba(0,0,0,0.3)",
                        transition: "all 0.4s",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-15px) scale(1.05)",
                          boxShadow: "0 35px 90px rgba(0,0,0,0.4)",
                        },
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <service.icon sx={{ fontSize: 70, mb: 3 }} />
                      </motion.div>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {service.description}
                      </Typography>
                    </Card>
                  </Tilt>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container
        data-section
        maxWidth="xl"
        sx={{ position: "relative", zIndex: 1, py: 15 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
            <Card
              data-aos="zoom-in"
              sx={{
                p: { xs: 6, md: 10 },
                textAlign: "center",
                background: isDark
                  ? "linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)"
                  : "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                color: "white",
                borderRadius: 6,
                boxShadow: isDark
                  ? "0 30px 80px rgba(230, 57, 70, 0.4)"
                  : "0 30px 80px rgba(25, 118, 210, 0.3)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: alpha("#ffffff", 0.1),
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -50,
                  left: -50,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: alpha("#ffffff", 0.1),
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  fontSize: { xs: "2rem", md: "3rem" },
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Ready to Transform Your Logistics?
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 5, opacity: 0.9, position: "relative", zIndex: 1 }}
              >
                Join thousands of businesses already shipping smarter
              </Typography>
              <MagneticButton>
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/register")}
                    sx={{
                      px: 6,
                      py: 2.5,
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      borderRadius: 3,
                      textTransform: "none",
                      bgcolor: "white",
                      color: isDark ? "#e63946" : "#1976d2",
                      boxShadow: "0 15px 50px rgba(0,0,0,0.3)",
                      position: "relative",
                      zIndex: 1,
                      "&:hover": {
                        bgcolor: alpha("#ffffff", 0.95),
                        transform: "translateY(-8px)",
                        boxShadow: "0 25px 70px rgba(0,0,0,0.5)",
                      },
                    }}
                  >
                    Start Free Trial
                  </Button>
                </motion.div>
              </MagneticButton>
            </Card>
          </Tilt>
        </motion.div>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          py: 8,
          background: isDark ? alpha("#1a1d29", 0.8) : alpha("#000000", 0.05),
          backdropFilter: "blur(20px)",
          borderTop: `1px solid ${
            isDark ? alpha("#ffffff", 0.1) : alpha("#000000", 0.1)
          }`,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background: isDark
                    ? "linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)"
                    : "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                LogiFlow
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isDark ? alpha("#ffffff", 0.7) : alpha("#000000", 0.7),
                  mb: 3,
                }}
              >
                The future of logistics, delivered today. Fast, secure, and
                intelligent shipping solutions for businesses worldwide.
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Company
              </Typography>
              {["About", "Careers", "Press", "Blog"].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    mb: 1,
                    color: isDark
                      ? alpha("#ffffff", 0.7)
                      : alpha("#000000", 0.7),
                    cursor: "pointer",
                    "&:hover": {
                      color: isDark ? "#e63946" : "#1976d2",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Services
              </Typography>
              {["Express", "Freight", "Warehouse", "Tracking"].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    mb: 1,
                    color: isDark
                      ? alpha("#ffffff", 0.7)
                      : alpha("#000000", 0.7),
                    cursor: "pointer",
                    "&:hover": {
                      color: isDark ? "#e63946" : "#1976d2",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Stay Updated
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isDark ? alpha("#ffffff", 0.7) : alpha("#000000", 0.7),
                  mb: 2,
                }}
              >
                Subscribe to our newsletter for the latest updates
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: `1px solid ${
                      isDark ? alpha("#ffffff", 0.2) : alpha("#000000", 0.2)
                    }`,
                    background: isDark
                      ? alpha("#ffffff", 0.05)
                      : alpha("#000000", 0.03),
                    color: isDark ? "white" : "black",
                    fontSize: "14px",
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    px: 3,
                    background: isDark
                      ? "linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)"
                      : "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: `1px solid ${
                isDark ? alpha("#ffffff", 0.1) : alpha("#000000", 0.1)
              }`,
              textAlign: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: isDark ? alpha("#ffffff", 0.5) : alpha("#000000", 0.5),
              }}
            >
              © 2025 LogiFlow. All rights reserved. Built with ❤️ for the future
              of logistics.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPageNew;
