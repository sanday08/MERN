const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../model/Post");
const validatePostFields = require("../../validation/post");

//@route  api/posts/test
//@desc   Test posts route
//@access Public

router.get("/test", (req, res) => res.json({ msg: "this is post Page" }));

//@route  api/posts/
//@desc   Display All Post
//@access Public
router.get("/", (req, res) => {
  Post.find().then((posts) => {
    if (!posts) {
      return res.status(404).json({ noPost: "No post Available." });
    }
    return res.json(posts);
  });
});

module.exports = router;
