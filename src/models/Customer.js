const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String || Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customers", CustomerSchema);

module.exports = Customer;
