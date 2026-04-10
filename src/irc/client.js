const net = require("net");
require("dotenv").config();
const parser = require("./parser");

const client = net.createConnection(
  {
    host: "irc.ppy.sh",
    port: 6667,
  },
  () => {
    console.log("Connected to IRC");
    client.write(`PASS ${process.env.PASSWORD}\r\n`);
    client.write(`NICK ${process.env.USERNAME}\r\n`);
  },
);

let buffer = "";

client.on("error", (err) => {
  console.log("SOCKET ERROR:", err.message);
});

client.on("close", () => {
  console.log("CONNECTION CLOSED");
});

client.on("end", () => {
  console.log("CONNECTION ENDED");
});

client.on("data", (data) => {
  buffer += data.toString();

  const lines = buffer.split(/\r?\n/);
  buffer = lines.pop();

  for (const line of lines) {
    if (!line.trim()) continue;
    const parsed = parser(line);

    if (parsed.command === "QUIT") continue;

    console.log(parsed);

    if (parsed.command === "PING") {
      console.log("Received PING, sending PONG");
      client.write(`PONG :${parsed.trailing}\r\n`);
    }
  }
});
