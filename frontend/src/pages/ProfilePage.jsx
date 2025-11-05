import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from "@mui/material";
import {
  PhotoCamera,
  Email,
  Phone,
  LocationOn,
  Business,
  Verified,
  Warning,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import DashboardLayout from "../components/layout/DashboardLayout";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pincode: yup.string().required("Pincode is required"),
  companyName: yup.string(),
  gstNumber: yup.string(),
});

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);

  // Sample user data - replace with API call
  const user = {
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    role: "vehicle_owner",
    avatar: "",
    address: "123, MG Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    companyName: "Kumar Transport Services",
    gstNumber: "GST1234567890",
    memberSince: "2023-01-15",
    verified: true,
    documents: [
      { name: "Aadhaar Card", status: "verified" },
      { name: "PAN Card", status: "verified" },
      { name: "Driving License", status: "pending" },
      { name: "GST Certificate", status: "verified" },
    ],
  };

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
      companyName: user.companyName,
      gstNumber: user.gstNumber,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Profile updated:", values);
      // TODO: API call to update profile
      setEditing(false);
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    setEditing(false);
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getDocumentStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <Verified color="success" />;
      case "pending":
        return <Warning color="warning" />;
      case "rejected":
        return <Warning color="error" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your personal information and documents
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Profile Header Card */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      src={user.avatar}
                      sx={{ width: 120, height: 120 }}
                      alt={user.name}
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        bgcolor: "primary.main",
                        color: "white",
                        "&:hover": { bgcolor: "primary.dark" },
                      }}
                      size="small"
                    >
                      <PhotoCamera fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Typography variant="h5">{user.name}</Typography>
                      {user.verified && (
                        <Chip
                          label="Verified"
                          color="success"
                          size="small"
                          icon={<Verified />}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                    >
                      {user.role.replace("_", " ").toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Member since{" "}
                      {new Date(user.memberSince).toLocaleDateString()}
                    </Typography>
                  </Box>
                  {!editing && (
                    <Button
                      variant="contained"
                      onClick={() => setEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Profile Information */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      name="companyName"
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.companyName &&
                        Boolean(formik.errors.companyName)
                      }
                      helperText={
                        formik.touched.companyName && formik.errors.companyName
                      }
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={formik.touched.city && formik.errors.city}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="State"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.state && Boolean(formik.errors.state)
                      }
                      helperText={formik.touched.state && formik.errors.state}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Pincode"
                      name="pincode"
                      value={formik.values.pincode}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.pincode && Boolean(formik.errors.pincode)
                      }
                      helperText={
                        formik.touched.pincode && formik.errors.pincode
                      }
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="GST Number"
                      name="gstNumber"
                      value={formik.values.gstNumber}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.gstNumber &&
                        Boolean(formik.errors.gstNumber)
                      }
                      helperText={
                        formik.touched.gstNumber && formik.errors.gstNumber
                      }
                      disabled={!editing}
                    />
                  </Grid>

                  {editing && (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button variant="outlined" onClick={handleCancel}>
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained">
                          Save Changes
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Documents Verification */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Documents
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List>
                {user.documents.map((doc, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      {getDocumentStatusIcon(doc.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.name}
                      secondary={
                        <Chip
                          label={doc.status}
                          color={getDocumentStatusColor(doc.status)}
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                Upload Documents
              </Button>
            </Paper>

            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Contact
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Email sx={{ mr: 2, color: "text.secondary" }} />
                <Typography variant="body2">{user.email}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Phone sx={{ mr: 2, color: "text.secondary" }} />
                <Typography variant="body2">{user.phone}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOn sx={{ mr: 2, color: "text.secondary" }} />
                <Typography variant="body2">
                  {user.city}, {user.state}
                </Typography>
              </Box>
              {user.companyName && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Business sx={{ mr: 2, color: "text.secondary" }} />
                  <Typography variant="body2">{user.companyName}</Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default ProfilePage;
