module.exports.index = function (req, res) {
    res.json(200, {
      message: "list of new posts",
      posts: [],
    });
  };
  