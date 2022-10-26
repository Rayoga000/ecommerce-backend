const { Cart, validateCart } = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addCart = async (req, res) => {
  try {
    const { error } = validateCart(req.body);
    if (error) {
      return res.status(400).json({ err: error.details[0].message });
    }
    const cart = await new Cart(req.body);
    await cart.save();
    return res.status(201).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getCart,
  addCart,
  updateCart,
  deleteCart,
};
