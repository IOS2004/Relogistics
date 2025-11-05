import React from "react";
import { Box, Container, Typography } from "@mui/material";
import DashboardLayout from "../components/layout/DashboardLayout";
import PaymentManagement from "../components/payments/PaymentManagement";

const PaymentsPage = () => {
  // Sample data - replace with API calls
  const payments = [
    {
      id: "PAY001",
      loadTitle: "Construction Materials - Mumbai to Pune",
      from: "Acme Logistics",
      to: "Suresh Patel",
      amount: 25000,
      status: "completed",
      date: "2025-11-05T14:30:00",
      transactionId: "TXN123456789",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "PAY002",
      loadTitle: "Electronics Shipment - Delhi to Noida",
      from: "Tech Solutions",
      to: "Rakesh Verma",
      amount: 15000,
      status: "pending",
      date: "2025-11-04T10:15:00",
      transactionId: "",
      paymentMethod: "",
    },
    {
      id: "PAY003",
      loadTitle: "FMCG Products - Bangalore to Chennai",
      from: "FastMove Inc",
      to: "Ramesh Reddy",
      amount: 45000,
      status: "completed",
      date: "2025-11-03T16:45:00",
      transactionId: "TXN987654321",
      paymentMethod: "UPI",
    },
    {
      id: "PAY004",
      loadTitle: "Agricultural Products - Nashik to Mumbai",
      from: "Green Cargo",
      to: "Vijay Kumar",
      amount: 18000,
      status: "pending",
      date: "2025-11-02T09:20:00",
      transactionId: "",
      paymentMethod: "",
    },
    {
      id: "PAY005",
      loadTitle: "Furniture Transport - Ahmedabad to Surat",
      from: "Furniture Express",
      to: "Amit Sharma",
      amount: 20000,
      status: "completed",
      date: "2025-11-01T11:00:00",
      transactionId: "TXN456789123",
      paymentMethod: "Cheque",
    },
    {
      id: "PAY006",
      loadTitle: "Chemical Transport - Pune to Nagpur",
      from: "ChemLogistics",
      to: "Raj Kumar",
      amount: 55000,
      status: "completed",
      date: "2025-10-30T15:30:00",
      transactionId: "TXN789123456",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "PAY007",
      loadTitle: "Textile Goods - Surat to Mumbai",
      from: "Textile Movers",
      to: "Ramesh Patel",
      amount: 32000,
      status: "failed",
      date: "2025-10-28T12:45:00",
      transactionId: "TXN111222333",
      paymentMethod: "UPI",
    },
    {
      id: "PAY008",
      loadTitle: "Medical Supplies - Chennai to Bangalore",
      from: "MedCargo",
      to: "Sunil Reddy",
      amount: 28000,
      status: "pending",
      date: "2025-10-27T08:15:00",
      transactionId: "",
      paymentMethod: "",
    },
  ];

  const userRole = "vehicle_owner"; // This should come from auth context

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Payments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your payments and transactions
          </Typography>
        </Box>

        <PaymentManagement payments={payments} userRole={userRole} />
      </Container>
    </DashboardLayout>
  );
};

export default PaymentsPage;
