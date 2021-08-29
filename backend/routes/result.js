const express = require("express");

const resultController = require("../controllers/result");

const router = express.Router();

router.post("", resultController.addResult);

router.put("/:studentid", resultController.updateResult);

router.get("", resultController.getResults);

router.get("/:studentid", resultController.getResult);

router.delete("/:studentid", resultController.deleteResult);

module.exports = router;