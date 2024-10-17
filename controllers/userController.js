const User = require('../models/User');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Other methods for user routes (getUserById, createUser, etc.) follow this pattern

module.exports = {
  getAllUsers
  // other functions here
};
