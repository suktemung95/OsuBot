require("dotenv").config();
const startServer = require("./api/server");
const IRCClient = require("./irc/client");
const commands = require("./irc/commands");

console.log({
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  USERNAME: process.env.USER,
  PASSWORD: process.env.PASS,
});

const client = new IRCClient({
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USER,
  password: process.env.PASS,
});

client.connect();
startServer(commands);
