const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "secret_this_is_employee_login");
        req.employeeData = { username: decodedToken.username, employeeId: decodedToken.employeeId }
        next();
    } catch (error) {
        res.status(401).json({ message: "You are not Athenticated!" });
    }
};