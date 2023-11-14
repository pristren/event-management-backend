const express = require("express");
const {
  getAllCustomers,
  deleteCustomer,
  getCustomersNoPagination,
  createCustomer,
  deleteMultipleCustomers,
  getSingleCustomer,
  updateCustomer,
  getCustomersBySearch,
  getCustomersByDateRange,
} = require("../controllers/customerController");
const checkLogin = require("../middleware/checkLogin");
const router = express.Router();

router.get("/getAllCustomers", checkLogin, getAllCustomers);
// get customers by search
router.get("/getCustomersBySearch", checkLogin, getCustomersBySearch);
router.get("/getCustomersNoPagination", checkLogin, getCustomersNoPagination);
router.get("/getSingleCustomer/:id", checkLogin, getSingleCustomer);
router.post("/createCustomer", checkLogin, createCustomer);
router.delete("/deleteCustomer/:id", checkLogin, deleteCustomer);
router.delete("/deleteMultipleCustomers", checkLogin, deleteMultipleCustomers);
router.put("/updateCustomer/:id", checkLogin, updateCustomer);

module.exports = router;
