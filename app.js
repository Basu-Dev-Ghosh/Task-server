require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routers/router");
const port = process.env.PORT || 4000;
require("./db/conn");
app.use(cors());
app.use(express.json());
app.use(router)
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => console.log(`Server Starts on port ${port}`));
