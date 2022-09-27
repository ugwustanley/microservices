import express from "express";
import routes from "./routes/index";
import bodyParser from "body-parser";
import pjf from "../package.json";
import axios from "axios";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("welcome to service registry navigate to /users");
});

app.use("/users", routes);

const PORT = process.env.PORT || 7001;

server.listen(6000);

server.on("listening", () => {
  console.log(`app listening at port ${server.address().port}`);
});
