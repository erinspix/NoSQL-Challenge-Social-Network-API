const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../controllers/thoughtController');

// '/api/thoughts'
router.route('/')
      .get(getAllThoughts)
      .post(createThought);

// '/api/thoughts/:thoughtId'
router.route('/:thoughtId')
      .get(getThoughtById)
      .put(updateThought)
      .delete(deleteThought);

// '/api/thoughts/:thoughtId/reactions'
router.route('/:thoughtId/reactions')
.get(getThoughtById)
      .post(addReaction)
      .delete(removeReaction);

      // '/api/thoughts/:thoughtId/reactions'
router.route('/:thoughtId/reactions/:reactionId')
.post(addReaction)
.delete(removeReaction);

module.exports = router;
