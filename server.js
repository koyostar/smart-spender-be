const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();
require("./config/database");

const app = express();

const HOST = process.env.HOST_SITE_URL;

const corsOptions = {
  credentials: true,
  origin: `${HOST}`,
  allowedHeaders: "Content-Type, Authorization",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./config/checkToken"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/expenses", require("./routes/api/expenses"));
app.use("/api/shared-expenses", require("./routes/api/sharedExpenses"));
app.use("/api/statistics", require("./routes/api/statistics"));
app.use("/api/transfer", require("./routes/api/transfer"))

const port = process.env.PORT || 4000;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
