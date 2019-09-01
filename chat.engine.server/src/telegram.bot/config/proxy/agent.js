const proxy = require("./proxy");

const SocksAgent = require("socks5-https-client/lib/Agent");

const socksAgent = new SocksAgent({
  socksHost: proxy.ip,
  socksPort: proxy.port
});

module.exports = socksAgent;
