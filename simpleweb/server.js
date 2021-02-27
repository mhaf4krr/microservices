const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from v3");
});

console.log("Hello from v2");

app.listen(3000);
