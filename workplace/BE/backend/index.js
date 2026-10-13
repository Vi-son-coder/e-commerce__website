const express = require("express");
require("dotenv").config(); 
const router = require("./router/client/index.router");

const app = express();
const port = 3000;

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
