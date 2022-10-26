const { Order, validateOrder } = require("../models/Order");

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addOrder = async (req, res) => {
  try {
    const { error } = validateOrder(req.body);
    if (error) {
      return res.status(400).json({ err: error.details[0].message });
    }
    const order = await new Order(req.body);
    await order.save();
    return res.status(201).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
};
