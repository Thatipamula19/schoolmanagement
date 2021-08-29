const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.slipt(" ")[1];
        const decodedToken = jwt.verify(token, "secret_this_is_adimin_login");
        req.adiminData = { username: decodedToken.username, adiminId: decodedToken.adiminId };
        next();
    } catch (error) {
        res.status(401).json({ message: "You are not Authenticated!" });
    }
};