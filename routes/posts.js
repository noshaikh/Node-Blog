const express = require("express");
const db = require("./../data/helpers/postDb.js");
const users = require("./users");
const router = express.Router();

router.get("/:id", (req, res) => {
  db.get(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified post does not exist." })

        .catch(err => {
          res
            .status(500)
            .json({ error: "The post information could not be retrieved." });
        });
    }
  });
});

router.post("/", (req, res) => {
  const post = req.body;
  if (post.text) {
    try {
      const response = db.insert(post);
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide text for the post."
    });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;
  db.update(id, post).then(count => {
    if (!count) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } else if (post.text) {
      try {
        db.update(id, post);
        res.status(200).json(count);
      } catch (err) {
        res
          .status(500)
          .json({ message: "The post information could not be modified" });
      }
    } else {
      res.status(400).json({
        errorMessage: "Please provide text for the post."
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
