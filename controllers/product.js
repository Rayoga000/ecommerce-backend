const { Product, validateProduct } = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    let products;
    const newQuery = req.query.new;
    const categoryQuery = req.query.category;
    if (newQuery) {
      products = await Product.find({}).sort({ createdAt: -1 });
    } else if (categoryQuery) {
      products = await Product.find({ categories: { $in: [categoryQuery] } });
    } else {
      products = await Product.find({});
    }
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addProduct = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const { error } = validateProduct(req.body);
      if (error) {
        return res.status(400).json({ err: error.details[0].message });
      }
      const product = await new Product(req.body);
      await product.save();
      return res.status(201).json(product);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(product);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const product = await Product.findByIdAndDelete(req.params.id);
      return res.status(200).json(product);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
