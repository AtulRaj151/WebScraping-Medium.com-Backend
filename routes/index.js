const { Router } = require("express");
const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/index");

router.get("/scrap/:tags", HomeController.scrap);
module.exports = router;
