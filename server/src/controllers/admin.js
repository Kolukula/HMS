import User from "../models/User.js";

// Create new user (doctor, receptionist, lab staff)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, specialization } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ name, email, password, role, phone, specialization });
    await newUser.save();

    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users (with search & pagination)
export const getUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 10, search = "" } = req.query;

    const query = {};
    if (role) query.role = role;
    if (search) query.name = { $regex: search, $options: "i" };

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({ users, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
