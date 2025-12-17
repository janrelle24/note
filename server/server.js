const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));               