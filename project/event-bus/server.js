const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

let SERVICES = [
  {
    service: "posts",
    url: "http://posts-srv:4001/event",
  },
  {
    service: "comments",
    url: "http://comments-srv:4002/event",
  },
];

app.post("/event", async (req, res) => {
  try {
    let event = req.body;

    console.log(event);

    SERVICES.map(async (service) => {
      await forwardEvent(service.url, event);
    });

    res.send("Done");
  } catch (error) {
    console.log(error);
  }
});

async function forwardEvent(url, data) {
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
}

app.listen(4000, () => {
  console.log("event bus running on 4000");
});
