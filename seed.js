const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

// Sample User Data
const userSeeds = [
  {
    username: 'john_doe',
    email: 'john@example.com',
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
  },
  {
    username: 'lernantino',
    email: 'lernantino@example.com',
  },
];

// Sample Thought Data
const thoughtSeeds = [
  {
    thoughtText: 'This is my first thought!',
    username: 'john_doe',
  },
  {
    thoughtText: 'Loving this social network API!',
    username: 'jane_smith',
  },
  {
    thoughtText: 'Coding is awesome!',
    username: 'lernantino',
  },
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed the Database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert users
    const createdUsers = await User.insertMany(userSeeds);
    console.log('Users seeded:', createdUsers);

    // Add thought data
    for (let thought of thoughtSeeds) {
      // Find the user associated with the thought
      const user = await User.findOne({ username: thought.username });

      // Create the thought and associate it with the user
      const newThought = await Thought.create({
        ...thought,
        userId: user._id,
      });

      // Push the thought to the user's thoughts array
      await User.findByIdAndUpdate(user._id, { $push: { thoughts: newThought._id } });
    }

    // Make users friends
    const [john, jane, lernantino] = await User.find(); // Find all users

    // Establish friendships
    await User.findByIdAndUpdate(john._id, { $addToSet: { friends: [jane._id, lernantino._id] } });
    await User.findByIdAndUpdate(jane._id, { $addToSet: { friends: [john._id, lernantino._id] } });
    await User.findByIdAndUpdate(lernantino._id, { $addToSet: { friends: [john._id, jane._id] } });

    console.log('Friendships established successfully!');
    console.log('Thoughts seeded successfully!');
    process.exit(0); // Exit the process
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit the process with an error code
  }
};

seedDatabase();
