const express = require("express");
const port = 8000;
const app = express();

const cors = require("cors");
app.use(cors());

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error in connecting to the databases", err);
    return;
  }

  console.log("connected to the port", port);
});
