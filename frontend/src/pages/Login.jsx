import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  IconButton,
  alpha,
} from "@mui/material";
import { ArrowBack, LocalShipping, Email, Lock } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import AlertMessage from "../components/common/AlertMessage";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../theme/ThemeProvider";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // TODO: Implement login API call
        console.log("Form submitted:", values);
        
        // Save token and user role to localStorage
        localStorage.setItem("token", "demo-token-123");
        localStorage.setItem("userRole", "Broker");
        
        setAlert({
          open: true,
          message: "Login successful!",
          severity: "success",
        });
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } catch (error) {
        setAlert({
          open: true,
          message: error.message || "Login failed",
          severity: "error",
        });
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: isDark
          ? "linear-gradient(135deg, #0a0e1a 0%, #1a1d29 100%)"
          : "linear-gradient(135deg, #e3f2fd 0%, #f5f5f5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 3 },
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? "radial-gradient(circle at 20% 50%, rgba(230, 57, 70, 0.1) 0%, transparent 50%)"
            : "radial-gradient(circle at 20% 50%, rgba(25, 118, 210, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          bgcolor: isDark ? alpha("#ffffff", 0.1) : alpha("#000000", 0.05),
          backdropFilter: "blur(8px)",
          "&:hover": {
            bgcolor: isDark ? alpha("#ffffff", 0.15) : alpha("#000000", 0.1),
          },
        }}
      >
        <ArrowBack sx={{ color: isDark ? "white" : "inherit" }} />
      </IconButton>

      <Container component="main" maxWidth="xs">
        <Paper
          elevation={isDark ? 0 : 8}
          sx={{
            p: { xs: 3, sm: 4 },
            width: "100%",
            bgcolor: isDark ? alpha("#1a1d29", 0.8) : alpha("#ffffff", 0.95),
            backdropFilter: "blur(20px)",
            border: isDark ? `1px solid ${alpha("#ffffff", 0.1)}` : "none",
            borderRadius: 3,
            boxShadow: isDark
              ? "0 20px 60px rgba(0,0,0,0.5)"
              : "0 20px 60px rgba(0,0,0,0.1)",
          }}
        >
          {/* Logo/Brand */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: { xs: 56, sm: 64 },
                height: { xs: 56, sm: 64 },
                borderRadius: "50%",
                background: isDark
                  ? "linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)"
                  : "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isDark
                  ? "0 8px 32px rgba(230, 57, 70, 0.4)"
                  : "0 8px 32px rgba(25, 118, 210, 0.3)",
              }}
            >
              <LocalShipping
                sx={{ fontSize: { xs: 32, sm: 36 }, color: "white" }}
              />
            </Box>
          </Box>

          <Typography
            component="h1"
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.75rem", sm: "2.125rem" },
              color: isDark ? "white" : "text.primary",
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{
              color: isDark ? alpha("#ffffff", 0.7) : "text.secondary",
              mb: 4,
              fontSize: { xs: "0.875rem", sm: "0.875rem" },
            }}
          >
            Sign in to access your logistics dashboard
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={{ xs: 2, sm: 2.5 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email Address"
                  placeholder="your.email@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <Email
                        sx={{
                          mr: 1,
                          color: isDark
                            ? alpha("#ffffff", 0.5)
                            : "action.active",
                        }}
                      />
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: isDark
                        ? alpha("#ffffff", 0.05)
                        : "background.paper",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <Lock
                        sx={{
                          mr: 1,
                          color: isDark
                            ? alpha("#ffffff", 0.5)
                            : "action.active",
                        }}
                      />
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: isDark
                        ? alpha("#ffffff", 0.05)
                        : "background.paper",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    py: { xs: 1.5, sm: 1.75 },
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                    fontWeight: 600,
                    background: isDark
                      ? "linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)"
                      : "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    boxShadow: isDark
                      ? "0 4px 20px rgba(230, 57, 70, 0.4)"
                      : "0 4px 20px rgba(25, 118, 210, 0.3)",
                    "&:hover": {
                      boxShadow: isDark
                        ? "0 6px 28px rgba(230, 57, 70, 0.5)"
                        : "0 6px 28px rgba(25, 118, 210, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate("/register")}
                  variant="body2"
                  sx={{
                    color: isDark ? "#e63946" : "primary.main",
                    fontWeight: 500,
                    textDecoration: "none",
                    fontSize: { xs: "0.875rem", sm: "0.875rem" },
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      <AlertMessage
        open={alert.open}
        handleClose={() => setAlert({ ...alert, open: false })}
        severity={alert.severity}
        message={alert.message}
      />
    </Box>
  );
};

export default Login;
