const { validationResult } = require('express-validator');

const User = require('../models/Users');
const Post = require('../models/posts');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
exports.createPost = async (req, res) => {
  const errors = validationResult(req).errors;
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  try {
    const post = {
      text: req.body.text,
      user: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar,
    };
    const newpost = new Post(post);
    const result = await newpost.save();
    res.json(result);
  } catch (error) {
    console.log('server error in creating post...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
exports.getPosts = async (req, res) => {
  try {
    const result = await Post.find().sort({ date: -1 });
    res.json(result);
  } catch (error) {
    onsole.log('server error in retreiving posts...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
exports.getPost = async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    res.json(result);
  } catch (error) {
    onsole.log('server error in retreiving single post...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const ownerID = await Post.findById(postId).select('user');
    const isMatch = req.user.id.toString() !== ownerID.user.toString();
    if (isMatch)
      return res
        .status(400)
        .json([{ msg: 'You are not the owner of the post' }]);
    const result = await Post.findByIdAndDelete(postId);
    res.json(result);
  } catch (error) {
    console.log('server error in deleting  post...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id.toString();

    const like = { user: userId };

    const post = await Post.findById(postId).select('likes');

    const match = post.likes.filter((like) => {
      return like.user.toString() === userId;
    });
    if (match.length > 0) {
      return res.status(400).json([{ msg: 'You have already liked the post' }]);
    }
    post.likes = post.likes.push(like);

    await Post.findByIdAndUpdate(postId, { $set: post }, { new: true });

    res.json({ msg: 'liked the post' });
  } catch (error) {
    console.log('server error in deleting  post...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
exports.unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id.toString();

    const post = await Post.findById(postId).select('likes');

    const match = post.likes.filter((like) => {
      return like.user.toString() === userId;
    });

    if (match.length == 0) {
      return res.status(400).json([{ msg: 'You have not liked the post' }]);
    }

    const updated = post.likes.filter((like) => {
      return like.user.toString() !== userId;
    });

    post.likes = updated;

    await Post.findByIdAndUpdate(postId, { $set: post }, { new: true });

    res.json(post.likes);
  } catch (error) {
    console.log('server error in deleting  like...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
exports.comment = async (req, res) => {
  const errors = validationResult(req).errors;
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  try {
    const comment = {
      text: req.body.text,
      user: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar,
    };
    const result = await Post.findById(req.params.id).select('comments');

    result.comments = result.comments.unshift(comment);
    const data = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: result },
      { new: true }
    );

    res.json(data);
  } catch (error) {
    console.log('server error in creating comment...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
exports.deleteComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id.toString();
    const commentId = req.params.comment_id;

    const post = await Post.findById(postId).select('comments');

    const comment = post.comments.filter((comment) => {
      return comment._id.toString() === commentId;
    });

    if (comment.length == 0) {
      return res.status(400).json([{ msg: 'No Comment Found' }]);
    }

    const comments = post.comments.filter((comment) => {
      return comment._id.toString() !== commentId;
    });

    post.comments = comments;

    await Post.findByIdAndUpdate(postId, { $set: post }, { new: true });

    res.json(post);
  } catch (error) {
    console.log('server error in deleting  like...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};
