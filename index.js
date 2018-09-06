const users = require("./routes/users");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const home = require("./routes/home");

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/users", users);
server.use("/", home);

server.listen(9000, () => console.log("\n== API on port 9k ==\n"));
