const express = require("express");
require("dotenv").config();
const database = require("./config/database");
const cors = require("cors");
database.connect();
const router = require("./Router/client/index.router");
const routerAdmin = require("./Router/admin/index.router");

const app = express();
const port = process.env.PORT;
app.use(cors());

routerAdmin(app);
router(app);

app.listen(port, () => {
  console.log(`Đang mở cổng ${port}`);
});
