const express = require("express");

const feesController = require("../controllers/fees");

const router = express.Router();

router.post("", feesController.addFees);

router.put("/:studentid", feesController.updateFees);

router.get("", feesController.getFeeses);

router.get("/:studentid", feesController.getFees);

router.delete("/:studentid", feesController.deleteFees);


module.exports = router;