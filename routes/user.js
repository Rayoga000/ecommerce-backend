const express = require("express");
const {
  signup,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getStats,
} = require("../controllers/user");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/stats", verifyToken, getStats);
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
