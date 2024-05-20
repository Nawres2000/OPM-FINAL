// ============imports=============
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const { strict } = require("assert");
require("dotenv").config();
const auth = require("./src/controllers/authController");
const app = express();
const moment = require('moment');
require('moment-timezone');
// ============ imporing routes ================

const authRoute = require("./src/routes/authRoute");
const clientRoute = require("./src/routes/clientRoute");
const userRoute = require("./src/routes/userRoute");
const employeeRoute = require("./src/routes/employeeRoute");
const contractRoute = require("./src/routes/contractRoute");
const fileRoute = require("./src/routes/fileRoute");
const folderRoute = require("./src/routes/folderRoute");
const workOrderRoute = require("./src/routes/workOrderRoute");
const ticketRoute = require("./src/routes/ticketRoute");
const followUpRoute = require("./src/routes/followUpRoute");
const countRoute = require("./src/routes/countRoute");

//========== configuration ============
moment.tz.setDefault('Africa/Tunis');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
//app.use(userData);

// configuring cors
//app.use(cors);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control"
  );
  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.status(200).send();
  } else {
    next();
  }
});
//=========== connecting to database ==============
let gfs;
mongoose.set("strictQuery", true);
mongoose   
  .connect(
    // "mongodb://localhost:27017/",
    // "mongodb+srv://root:root@opmcluster.dvzi5iq.mongodb.net/OPM?retryWrites=true&w=majority",
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log("error has been occured: ", err));

// connecting the file upload to mongoose




// ========= configurring routes ==========

//app.use("/user", userRoute); not going to use those
app.use("/",authRoute);
app.use('/user', auth.verify, userRoute)
app.use("/client", auth.verify, clientRoute);
app.use("/employee", auth.verify, employeeRoute);
app.use("/contract", auth.verify, contractRoute);
app.use("/file", auth.verify, fileRoute);
app.use("/folder", auth.verify, folderRoute);
app.use("/workOrder", auth.verify, workOrderRoute);
app.use("/ticket", auth.verify, ticketRoute);
app.use("/followUp", auth.verify, followUpRoute);
app.use("/count", auth.verify, countRoute);
// ======== exporting app ========
module.exports = app;
