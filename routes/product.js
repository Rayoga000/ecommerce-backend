const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getProduct);
router.post("/", verifyToken, addProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
