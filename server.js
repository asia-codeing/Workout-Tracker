const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workoutDB',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
);

//Routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));


app.listen(PORT, () => {
    console.log("$$==============================$$");
    console.log(`App running on port ${PORT}!`);
    console.log("$$==============================$$");
});