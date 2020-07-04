// @desc      Get posts
// @route     Get /v1/api/posts/
// @access    Public
exports.getPosts = (req, res) => {
  res.json({ message: 'Hello There (Posts)' });
};
