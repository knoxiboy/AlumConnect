const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  getPosts, 
  createPost, 
  getPostById, 
  updatePost, 
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment
} = require('../controllers/postController');

const router = express.Router();

// Public routes
router.route('/').get(getPosts);
router.route('/:id').get(getPostById);

// Private routes
router.route('/').post(protect, createPost);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);
router.route('/like/:id').put(protect, likePost);
router.route('/unlike/:id').put(protect, unlikePost);
router.route('/comment/:id').post(protect, commentOnPost);
router.route('/comment/:id/:comment_id').delete(protect, deleteComment);

module.exports = router;