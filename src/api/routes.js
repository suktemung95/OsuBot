const express = require("express");
const router = express.Router();

router.post("/sendMessage", (req, res) => {
  const target = req.body.target;
  const message = req.body.message;
});
module.exports = router;
