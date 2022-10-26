const mongoose = require("mongoose");
const Joi = require("joi");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const validateCart = (cart) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    products: Joi.array(),
  });
  return schema.validate(cart);
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart, validateCart };
