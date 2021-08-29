const express = require("express");

const adimisionController = require("../controllers/adimision");

const router = express.Router();

router.post("", adimisionController.createAdimision);

router.put("/:studentid", adimisionController.updateAdimision);

router.get("", adimisionController.getAdimisions);

router.get("/:studentid", adimisionController.getAdimision);

router.delete("/:studentid", adimisionController.deleteAdimision);

router.post("/login", adimisionController.studentLogin);

module.exports = router;