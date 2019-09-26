require("./models/Users");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auhRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(bodyParser.json());
app.use(auhRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://tonkoyarik:tonkoyarik@mydb-hapsu.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo instance");
});
mongoose.connection.on("error", err => {
  console.error("error connection to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});

app.listen(8000, () => {
  console.log("listening on 8000");
});
