const net = require("net");
const parser = require("./parser");

class IrcClient {
  constructor({ host, port, username, password }) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;

    this.client = null;
    this.buffer = "";
  }

  connect() {
    this.client = net.createConnection(
      {
        host: this.host,
        port: this.port,
      },
      () => {
        console.log("Connected to IRC");
        this.client.write(`PASS ${this.password}\r\n`);
        this.client.write(`NICK ${this.username}\r\n`);
      },
    );

    this.client.on("error", (err) => {
      console.log("SOCKET ERROR:", err.message);
    });

    this.client.on("close", () => {
      console.log("CONNECTION CLOSED");
    });

    this.client.on("end", () => {
      console.log("CONNECTION ENDED");
    });

    this.client.on("data", (data) => {
      this.handleData(data);
    });
  }

  handleData(data) {
    this.buffer += data.toString();

    const lines = this.buffer.split(/\r?\n/);
    this.buffer = lines.pop();

    for (const line of lines) {
      if (!line.trim()) continue;
      const parsed = parser(line);
      this.handleMessage(parsed);
    }
  }

  handleMessage(msg) {
    if (msg.command === "PING") {
      this.sendRaw(`PONG :${msg.trailing}`);
      return;
    }

    console.log(msg);
  }

  sendRaw(line) {
    if (!this.client) return;
    this.client.write(`${line}\r\n`);
  }
}

module.exports = IrcClient;
