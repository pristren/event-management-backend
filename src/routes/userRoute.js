const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  findAUser,
  findAUserById,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/updates/:userId", updateUser);
router.get("/:email", findAUser);
router.get("/u/:id", findAUserById);

module.exports = router;
