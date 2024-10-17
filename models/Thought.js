const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); // Import reaction schema

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleDateString(), // Getter method for formatting
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Embedded reactions
}, {
  toJSON: { virtuals: true, getters: true },
  id: false,
});

// Virtual field for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;
