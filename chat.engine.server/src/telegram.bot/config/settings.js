const socksAgent = require("./proxy/agent");
const token = require("./token");

options = {
  telegram: {
    agent: socksAgent
  },
  username: "",
  channelMode: false
};

module.exports = { token, options };
