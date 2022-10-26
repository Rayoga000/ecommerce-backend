const { User, validateUser } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ err: error.details[0].message });
    }
    const user = await User.findOne({ email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await new User({
        ...req.body,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(200).json(newUser);
    }
    return res.status(400).json({ err: "User already exists!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ err: "Email filed is required!" });
    }
    if (!req.body.password) {
      return res.status(400).json({ err: "Password filed is required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: "User not found!" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ err: "You must enter a valid password" });
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    const { password, ...others } = user._doc;
    return res.status(201).json({ ...others, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getUsers = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const query = req.query.new;
      const users = query
        ? await User.find({}).limit(5).sort({ _id: -1 })
        : await User.find({});
      return res.status(200).json(users);
    }
    return res.status(400).json({ err: "Unauthorized!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const user = await User.findById(req.params.id);
      return res.status(200).json(user);
    }
    return res.status(400).json({ err: "Unauthorized!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.user.id == req.params.id || req.user.isAdmin) {
      const { password } = req.body;
      if (!password) {
        return res.status(400).json({ err: "Please provide password filed!" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.id == req.params.id || req.user.isAdmin) {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getStats = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const date = new Date();
      const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
      const stats = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        { $project: { month: { $month: "$createdAt" } } },
        { $group: { _id: "$month", total: { $sum: 1 } } },
      ]);
      return res.status(200).json(stats);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  signup,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getStats,
};
