function getFlow() {
  var fs = require("fs");
  let flow_json = fs.readFileSync("./src/data/flow.json");
  let flow = JSON.parse(flow_json);
  return flow;
}

function saveFlow(data) {
  var fs = require("fs");
  fs.writeFile("./src/data/flow.json", data, "utf8", () => {});
}

module.exports = {
  getFlow,
  saveFlow
};
