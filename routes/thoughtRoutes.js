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

router.route('/').get(getAllThoughts)
// router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);
// router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;
