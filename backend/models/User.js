const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [
      "Broker",
      "Vehicle Owner",
      "Driver",
      "Shipper",
      "Admin",
      "Verification Team",
      "Field RM",
      "Support Staff",
    ],
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
