const express = require("express");
const {
  getCart,
  addCart,
  updateCart,
  deleteCart,
} = require("../controllers/cart");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/:id", verifyToken, getCart);
router.post("/", verifyToken, addCart);
router.put("/:id", verifyToken, updateCart);
router.delete("/:id", verifyToken, deleteCart);

module.exports = router;
