const express = require("express");

const bodyParser = require("body-parser");

const fetch = require("node-fetch");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

let id = generateID();

let POSTS = [];

/* Methods */

app.post("/posts", async (req, res) => {
  let uid = id();
  POSTS[uid] = req.body;
  console.log(POSTS);
  await generateEvent({
    type: "post_created",
    data: req.body,
  });
  res.send("Success");
});

app.get("/posts", (req, res) => {
  res.send(JSON.stringify(POSTS));
});

function generateID() {
  let id = 0;

  return function () {
    return id++;
  };
}

app.listen(4001, () => {
  console.log("Posts listening on 4001");
});

async function generateEvent(event) {
  await fetch("http://event-bus-srv:4000/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
}
