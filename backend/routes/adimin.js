const express = require("express");

const adiminController = require("../controllers/adimin");

const router = express.Router();

router.post("", adiminController.adiminLogin);

module.exports = router;