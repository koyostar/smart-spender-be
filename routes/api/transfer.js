const express = require("express");
const router = express.Router();

const transferCtrl = require("../../controllers/api/transfer");

router.post("/create", transferCtrl.create);
router.get("/transfer/find", transferCtrl.findAll);

module.exports = router;
