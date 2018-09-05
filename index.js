const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const db = require("./data/helpers/userDb.js");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World");
});
server.get("/users", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The users information could not be retrieved" });
    });
});

server.get("/users/:id", (req, res) => {
  db.get(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." })

        .catch(err => {
          res
            .status(500)
            .json({ error: "The user information could not be retrieved." });
        });
    }
  });
});

server.post("/users", (req, res) => {
  const user = req.body;
  if (user.name) {
    try {
      const response = db.insert(user);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide name for the user."
    });
  }
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;
  db.update(id, user).then(count => {
    if (!count) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } else if (post.title && post.contents) {
      try {
        db.update(id, user);
        res.status(200).json(count);
      } catch (err) {
        res
          .status(500)
          .json({ message: "The post information could not be modified" });
      }
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
  });
});

server.delete("/users/:id", (req, res) => {
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

server.listen(9000, () => console.log("\n== API on port 9k ==\n"));
