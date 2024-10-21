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
const createUser = async (req, res) => {
  // Any INCOMING data for a POST route will be in the req.body OBJECT
  // WE capture the INCOMING data
  // const { username, email } = req.body;
  console.log("Incoming: ", req.body);
  // What OPERATION do we want to perform
  try {
    const newUser = await User.create(req.body);
    console.log("New: ", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.log("Err: ", error)
    res.status(500).json(error.message);
  }
} 


module.exports = {
  getAllUsers,
  // other functions here
  createUser
};
