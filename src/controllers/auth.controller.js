import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  registerUser,
  loginUser,
};
