const express = require('express');
const {
  getPosts,
  createPost,
  getPost,
  deletePost,
  likePost,
  comment,
  deleteComment,
  unlikePost,
} = require('../controllers/posts');
const { isAuth } = require('../middleware/auth');
const { check } = require('express-validator');
const router = express.Router();

router
  .route('/')
  .post(
    [isAuth, [check('text', 'please enter Text').not().isEmpty()]],
    createPost
  )
  .get(isAuth, getPosts);

router.route('/:id').get(isAuth, getPost).delete(isAuth, deletePost);

router.route('/like/:id').put(isAuth, likePost);
router.route('/unlike/:id').put(isAuth, unlikePost);

router
  .route('/comment/:id')
  .post(
    [isAuth, [check('text', 'please enter Text').not().isEmpty()]],
    comment
  );
router.route('/comment/:id/:comment_id').delete(isAuth, deleteComment);

module.exports = router;
