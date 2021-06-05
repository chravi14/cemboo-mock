const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config/config");
const orderRouter = require("./routes/order");
const usersRouter = require("./routes/users");
const videoRouter = require("./routes/video");
const awsVideoRouter = require("./routes/awsUpload");
const gcsVideoRouter = require("./routes/gcsUpload");
const azureVideoRouter = require("./routes/azureUpload");
const ibmVideoRouter = require("./routes/ibmUpload");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => console.log("Connected to Database"))
  .catch((err) => console.log("Connection failed", err));

app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use(orderRouter);
app.use("/api/user/", usersRouter);
app.use("/api/videos/", videoRouter);
app.use("/api/aws/videos/", awsVideoRouter);
app.use("/api/gcs/videos/", gcsVideoRouter);
app.use("/api/azure/videos/", azureVideoRouter);
app.use("/api/ibm/videos/", ibmVideoRouter);

// Normal usage
app.use(express.static(__dirname + "/uploads"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/uploads"));

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log("Server running on 5000");
});
