const Thought = require('../models/Thought');

// Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Other methods for thought routes (getThoughtById, createThought, etc.) follow this pattern

module.exports = {
  getAllThoughts
  // other functions here
};
