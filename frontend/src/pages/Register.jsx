import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import AlertMessage from "../components/common/AlertMessage";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  role: yup.string().required("Role is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Phone number is required"),
});

const roles = [
  "Broker",
  "Vehicle Owner",
  "Driver",
  "Shipper",
  "Verification Team",
  "Field RM",
  "Support Staff",
];

const Register = () => {
  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // TODO: Implement registration API call
        console.log("Form submitted:", values);
        setAlert({
          open: true,
          message: "Registration successful!",
          severity: "success",
        });
      } catch (error) {
        setAlert({
          open: true,
          message: error.message || "Registration failed",
          severity: "error",
        });
      }
    },
  });

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Full Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  name="role"
                  label="Role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                  helperText={formik.touched.role && formik.errors.role}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      <AlertMessage
        open={alert.open}
        handleClose={() => setAlert({ ...alert, open: false })}
        severity={alert.severity}
        message={alert.message}
      />
    </Container>
  );
};

export default Register;
