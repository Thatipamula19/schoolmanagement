const bcrypt = require("bcryptjs");
const { sign } = require("crypto");
const jwt = require("jsonwebtoken");

const Adimision = require("../models/adimision");

exports.createAdimision = (req, res, next) => {
    // const url = req.protocal + "://" + req.get("host");

    const adimision = new Adimision({
        studentid: req.body.studentid,
        stdname: req.body.stdname,
        stdfathername: req.body.stdfathername,
        stdgender: req.body.stdgender,
        stddob: req.body.stddob,
        stdmobile: req.body.stdmobile,
        stdemail: req.body.stdemail,
        stdclass: req.body.stdclass,
        stdaddress: req.body.stdaddress
    });

    const query = Adimision.findOne({ "studentid": req.body.studentid })
    query.then(student => {
        if (student) {
            res.status(404).json({
                message: "Student is Already Registered!"

            })
        }
        else {
            adimision.save().then(createdAdimsion => {
                console.log(createdAdimsion);
                res.status(201).json({
                    message: "Adimision Added Successfully!",
                    adimision: {
                        ...createdAdimsion,
                        id: createdAdimsion._id
                    }
                })
            });

        }
    }).catch(err => {
        res.status(500).json({
            message: "Added Adimision Failed!"
        });
    });



}

exports.updateAdimision = (req, res, next) => {
    const adimision = new Adimision({
        _id: req.body.id,
        studentid: req.body.studentid,
        stdname: req.body.stdname,
        stdfathername: req.body.stdfathername,
        stdgender: req.body.stdgender,
        stddob: req.body.stddob,
        stdmobile: req.body.stdmobile,
        stdemail: req.body.stdemail,
        stdclass: req.body.stdclass,
        stdaddress: req.body.stdaddress
    });
    console.log(adimision)
    Adimision.updateOne({ studentid: req.params.studentid }, adimision).then(result => {
        console.log(result)
        if (result.n > 0) {
            res.status(200).json({ message: "Adimision Updated SuccessFully!" });
        }
        else {
            res.status(500).json({ message: "Not Updated!" });
        }
    }).catch(err => {
        res.status(500).json({
            message: "Updating  failed!"
        });
    });

}

exports.getAdimisions = (req, res, next) => {
    Adimision.find().then(documents => {
        res.status(200).json({
            message: "Adimision Fethed Successfully",
            adimisions: documents
        })
    })
}

exports.getAdimision = (req, res, next) => {
    const query = Adimision.findOne({ "studentid": req.params.studentid })
    query.then(adimision => {
        if (adimision) {
            res.status(200).json(adimision)
        }
        else {
            res.status(404).json({
                message: "No Record Found"

            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Adimision Fetched Failed!"
        });
    });
}

exports.deleteAdimision = (req, res, next) => {
    Adimision.deleteOne({ studentid: req.params.studentid }).then(result => {
        console.log("Adimision Deleted!")
        if (result.n > 0) {
            res.status(200).json({ message: "Adimision Deleted!" });
        }
        else {
            res.status(500).json({ message: "Not Deleted!" });
        }
    }).catch(err => {
        res.status(500).json({
            message: "Deleting failed!"
        });
    });
}

exports.studentLogin = (req, res, next) => {
    let fetchedStudent;

    Adimision.findOne({ studentid: req.body.studentid }).then(student => {
        console.log(student);

        if (!student) {
            res.status(401).json({
                message: "Invalied StudentId"
            });
        }
        fetchedStudent = student;
        bcrypt.hash(student.stddob, 10).then(hash => {
            return bcrypt.compare(req.body.stddob, hash).then(result => {
                console.log(result);
                if (!result) {
                    res.status(401).json({
                        message: "Invalid Date of Birth"
                    })
                }

                const token = jwt.sign(
                    { studentid: fetchedStudent.studenid, stdId: fetchedStudent._id },
                    "secret_this_is_student_login",
                    { expiresIn: "1h" }
                );

                res.status(200).json({
                    token: token,
                    expiresIn: 3600,
                    studentid: fetchedStudent.studentid
                })
            })
        }).catch(err => {
            res.status(500).json({
                message: "Login Failed!"
            });
        });


    })
}