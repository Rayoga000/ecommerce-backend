const express = require("express");
const {
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/:id", verifyToken, getOrder);
router.post("/", verifyToken, addOrder);
router.put("/:id", verifyToken, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);

module.exports = router;
