const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");
const cors = require('cors');
const bodyparser = require("body-parser");

const app = express();
app.use(express.json());
mongoose.set('strictQuery', false);


mongoose.connect("mongodb+srv://admin:admin1234@hhap-db.n8zxs62.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    async () => {
      //console.log("database connected at "+ new Date());
      console.log("********************* database connected at " + new Date() + "*********************");
    },
    (err) => {
      console.log(err, "Error")
    }
  );

app.use(Router);
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(3000, () => {
  console.log("Server is running at port 3000");
});



