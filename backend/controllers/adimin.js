const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adimin = require("../models/adimin");


exports.adiminLogin = (req, res, next) => {
    let fetchedAdimin;
    adimin.findOne({ username: req.body.username }).then(adimin => {
        console.log(adimin);
        if (!adimin) {
            res.status(401).json({
                message: "Invalid Details"
            })
        }
        fetchedAdimin = adimin;


        bcrypt.hash(adimin.password, 10).then(hash => {
            return bcrypt.compare(req.body.password, hash).then(result => {
                console.log(result);
                if (!result) {
                    res.status(401).json({
                        message: "Invalid Password Details"
                    })
                }
                const token = jwt.sign(
                    { username: fetchedAdimin.username, adiminId: fetchedAdimin._id },
                    "secret_this_is_adimin_login",
                    { expiresIn: "1h" }
                );
                res.status(200).json({
                    token: token,
                    expiresIn: 3600,
                    adiminId: fetchedAdimin._id
                })
            })
        })

    })
}