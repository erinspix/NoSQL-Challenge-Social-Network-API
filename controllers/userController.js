const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error getting all users:', err);
    res.status(500).json({ message: 'Failed to retrieve users', error: err.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID!' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error getting user by ID:', err);
    res.status(500).json({ message: 'Failed to retrieve user', error: err.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json({ message: `User ${newUser.username} created successfully!`, user: newUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Failed to create user', error: err.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with that ID!' });
    }
    res.json({ message: `User ${updatedUser.username} updated successfully!`, user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID!' });
    }

    // Remove associated thoughts
    await Thought.deleteMany({ username: user.username });

    res.json({ message: `User ${user.username} and associated thoughts deleted successfully!` });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
};

// Add a friend
const addFriend = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId) || !mongoose.Types.ObjectId.isValid(req.params.friendId)) {
      return res.status(400).json({ message: 'Invalid user or friend ID format' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID!' });
    }
    res.json({ message: `Friend added successfully to user ${user.username}`, user });
  } catch (err) {
    console.error('Error adding friend:', err);
    res.status(500).json({ message: 'Failed to add friend', error: err.message });
  }
};

// Remove a friend
const removeFriend = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId) || !mongoose.Types.ObjectId.isValid(req.params.friendId)) {
      return res.status(400).json({ message: 'Invalid user or friend ID format' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID!' });
    }
    res.json({ message: `Friend removed successfully from user ${user.username}`, user });
  } catch (err) {
    console.error('Error removing friend:', err);
    res.status(500).json({ message: 'Failed to remove friend', error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
