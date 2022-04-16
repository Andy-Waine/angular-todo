const express = require("express");

const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});