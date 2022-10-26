const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const validateOrder = (order) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    products: Joi.array(),
    address: Joi.object().required(),
    status: Joi.string(),
  });
  return schema.validate(order);
};

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, validateOrder };
