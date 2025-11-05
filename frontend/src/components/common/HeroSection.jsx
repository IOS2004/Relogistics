import React from "react";
import { Box, Container, Typography, Button, Grid, alpha } from "@mui/material";
import { TrendingUp, Speed, Security, LocationOn } from "@mui/icons-material";

const HeroSection = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  showFeatures = false,
}) => {
  const features = [
    { icon: Speed, title: "Fast Delivery", description: "Real-time tracking" },
    { icon: Security, title: "Secure", description: "End-to-end encryption" },
    { icon: TrendingUp, title: "Reliable", description: "99.9% uptime" },
    { icon: LocationOn, title: "Pan India", description: "500+ cities" },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Shapes */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: alpha("#ffffff", 0.1),
          filter: "blur(80px)",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: alpha("#ffffff", 0.08),
          filter: "blur(100px)",
          animation: "float 8s ease-in-out infinite",
          animationDelay: "1s",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 800,
                lineHeight: 1.2,
                textShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.95,
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {primaryAction && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={primaryAction.onClick}
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: alpha("#ffffff", 0.9),
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={secondaryAction.onClick}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: alpha("#ffffff", 0.1),
                    },
                  }}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </Box>
          </Grid>

          {showFeatures && (
            <Grid item xs={12} md={5}>
              <Grid container spacing={2}>
                {features.map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: alpha("#ffffff", 0.15),
                        backdropFilter: "blur(10px)",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: alpha("#ffffff", 0.25),
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <feature.icon sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
