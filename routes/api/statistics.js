const express = require("express");
const router = express.Router();
const statisticsCtrl = require("../../controllers/api/statistics");

router.get("/", statisticsCtrl.calculateStats);

module.exports = router;
