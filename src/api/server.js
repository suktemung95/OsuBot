const express = require("express");
const router = require("./routes");

function startServer(commands) {
  const app = express();
  app.use("/", router);

  app.get("/ping", (req, res) => {
    res.send("pong!");
  });

  app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000!`);
  });
}

module.exports = startServer;
