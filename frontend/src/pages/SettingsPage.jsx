import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import DashboardLayout from "../components/layout/DashboardLayout";

const passwordValidationSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "Password should be minimum 8 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const SettingsPage = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    loadAlerts: true,
    bidAlerts: true,
    paymentAlerts: true,
    weeklyReports: false,
    monthlyReports: true,
  });

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Password change:", values);
      // TODO: API call to change password
      resetForm();
    },
  });

  const handleSettingChange = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    // TODO: API call to update settings
  };

  const handleDeleteAccount = () => {
    console.log("Delete account");
    // TODO: API call to delete account
    setDeleteDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account preferences and settings
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Notification Settings */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Notification Preferences
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive notifications via email"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={() => handleSettingChange("emailNotifications")}
                    />
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="SMS Notifications"
                    secondary="Receive notifications via SMS"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.smsNotifications}
                      onChange={() => handleSettingChange("smsNotifications")}
                    />
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Push Notifications"
                    secondary="Receive push notifications"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={() => handleSettingChange("pushNotifications")}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Alert Types
              </Typography>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Load Alerts"
                    secondary="New load postings and updates"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.loadAlerts}
                      onChange={() => handleSettingChange("loadAlerts")}
                    />
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Bid Alerts"
                    secondary="Bid status updates"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.bidAlerts}
                      onChange={() => handleSettingChange("bidAlerts")}
                    />
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Payment Alerts"
                    secondary="Payment confirmations and reminders"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.paymentAlerts}
                      onChange={() => handleSettingChange("paymentAlerts")}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Report Settings */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Report Settings
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List>
                <ListItem>
                  <ListItemText
                    primary="Weekly Reports"
                    secondary="Receive weekly activity summary"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.weeklyReports}
                      onChange={() => handleSettingChange("weeklyReports")}
                    />
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Monthly Reports"
                    secondary="Receive monthly earnings report"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.monthlyReports}
                      onChange={() => handleSettingChange("monthlyReports")}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>

            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Privacy Settings
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="body2" color="text.secondary" paragraph>
                Control who can see your profile and contact information
              </Typography>

              <Button variant="outlined" fullWidth>
                Manage Privacy
              </Button>
            </Paper>
          </Grid>

          {/* Change Password */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <form onSubmit={passwordFormik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Current Password"
                      name="currentPassword"
                      value={passwordFormik.values.currentPassword}
                      onChange={passwordFormik.handleChange}
                      error={
                        passwordFormik.touched.currentPassword &&
                        Boolean(passwordFormik.errors.currentPassword)
                      }
                      helperText={
                        passwordFormik.touched.currentPassword &&
                        passwordFormik.errors.currentPassword
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      name="newPassword"
                      value={passwordFormik.values.newPassword}
                      onChange={passwordFormik.handleChange}
                      error={
                        passwordFormik.touched.newPassword &&
                        Boolean(passwordFormik.errors.newPassword)
                      }
                      helperText={
                        passwordFormik.touched.newPassword &&
                        passwordFormik.errors.newPassword
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm New Password"
                      name="confirmPassword"
                      value={passwordFormik.values.confirmPassword}
                      onChange={passwordFormik.handleChange}
                      error={
                        passwordFormik.touched.confirmPassword &&
                        Boolean(passwordFormik.errors.confirmPassword)
                      }
                      helperText={
                        passwordFormik.touched.confirmPassword &&
                        passwordFormik.errors.confirmPassword
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth>
                      Update Password
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Danger Zone */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{ p: 3, border: "1px solid", borderColor: "error.main" }}
            >
              <Typography variant="h6" gutterBottom color="error">
                Danger Zone
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Alert severity="warning" sx={{ mb: 2 }}>
                These actions are irreversible. Please proceed with caution.
              </Alert>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button variant="outlined" color="error">
                  Export My Data
                </Button>
                <Button variant="outlined" color="error">
                  Deactivate Account
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete Account
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* App Info */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Version
                  </Typography>
                  <Typography variant="body1">1.0.0</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body1">November 4, 2025</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="outlined" size="small">
                      Terms of Service
                    </Button>
                    <Button variant="outlined" size="small">
                      Privacy Policy
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Delete Account Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <Alert severity="error" sx={{ mb: 2 }}>
              This action cannot be undone!
            </Alert>
            <Typography>
              Are you sure you want to delete your account? All your data will
              be permanently removed.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleDeleteAccount}
              color="error"
              variant="contained"
            >
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DashboardLayout>
  );
};

export default SettingsPage;
