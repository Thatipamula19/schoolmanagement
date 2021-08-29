const express = require("express");

const employeeController = require("../controllers/employee");

const router = express.Router();


router.post("", employeeController.addEmployee);

router.get("", employeeController.getEmployees);

router.post("/login", employeeController.employeeLogin);

module.exports = router;