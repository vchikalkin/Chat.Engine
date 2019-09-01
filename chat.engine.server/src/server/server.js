const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server works!");
});

app.get("/restart", (req, res) => {
  console.log("Restarting...");
  process.exit(1);
});

app.get("/flow/get", (req, res) => {
  setTimeout(() => {
    let file_service = require("./service/file");
    let flow = file_service.getFlow();
    res.send(flow);
  }, 0);
});

app.post("/flow/set", (req, res) => {
  console.log(req.body);
  let file_service = require("./service/file");
  let flow = req.body;
  file_service.saveFlow(JSON.stringify(flow));
  res.sendStatus(200);
});

function runServer(port) {
  app.listen(port);
  console.log("Server started and listening at port #" + port + "...");
}

module.exports = {
  runServer
};
