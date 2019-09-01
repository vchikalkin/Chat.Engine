function getProxy() {
  let list = [
    {
      ip: "192.169.197.146",
      port: 12792
    }
  ];

  //let proxy = list[Math.floor(Math.random() * list.length)];
  let proxy = list[0];
  console.log("Using proxy: " + proxy.ip + ":" + proxy.port);
  return proxy;
}

module.exports = getProxy();
