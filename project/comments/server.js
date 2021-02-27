const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

let POSTS = [];

app.post("/event", async (req, res) => {
  let event = req.body;
  console.log(event);
  handleEvents(event);
  res.send("Done");
});

app.get("/comments", (req, res) => {
  res.send(JSON.stringify(POSTS));
});

app.listen(4002, () => {
  console.log("comments running on 4002");
});

function handleEvents(event) {
  switch (event.type) {
    case "post_created":
      POSTS.push({
        ...event.data,
        comments: [],
      });
      break;

    default:
      null;
  }
}
