import bcryptjs from "bcryptjs";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "An account with this email already exists" });
    }

    const hashPass = await bcryptjs.hash(password, 10);

    const user = new User({ username, email, password: hashPass });
    await user.save();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "No account found with this email" });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong", error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Could not fetch users", error: err.message });
  }
};
