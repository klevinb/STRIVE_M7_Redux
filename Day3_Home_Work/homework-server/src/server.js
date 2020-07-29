const express = require("express");
const listEndpoints = require("express-list-endpoints");
const studentRoute = require("./services/students");
const portfoliosRoute = require("./services/portfolio");
const mongoose = require("mongoose");
const { notFound, notAuthorized, generalError } = require("./handleErrors");
const db = require("./db");
const cors = require("cors");
const { join } = require("path");

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static(join(__dirname, "./public")));

const port = process.env.PORT || 3003;

server.use("/students", studentRoute);
server.use("/projects", portfoliosRoute);

console.log(listEndpoints(server));

server.use(notFound);
server.use(notAuthorized);
server.use(generalError);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
