const Result = require("../models/result");


exports.addResult = (req, res, next) => {

    const result = Result({
        studentid: req.body.studentid,
        stdname: req.body.stdname,
        stdclass: req.body.stdclass,
        telugu: req.body.telugu,
        hindi: req.body.hindi,
        english: req.body.english,
        maths: req.body.maths,
        science: req.body.science,
        social: req.body.social,
    })
    result.save().then(addResult => {
        console.log(addResult);
        res.status(201).json({
            message: "Result Added SuccessFully!",
            result: {
                ...addResult,
                id: addResult._id
            }
        })
    }).catch(err => {
        res.status(500).json({
            message: "Result Added Failed!"
        });
    });
}

exports.updateResult = (req, res, next) => {
    const result = Result({
        _id: req.body.id,
        studentid: req.body.studentid,
        stdname: req.body.stdname,
        stdclass: req.body.stdclass,
        telugu: req.body.telugu,
        hindi: req.body.hindi,
        english: req.body.english,
        maths: req.body.maths,
        science: req.body.science,
        social: req.body.social,
    })
    Result.updateOne({ studentid: req.params.studentid }, result).then(result => {
        console.log(result);
        if (result.n > 0) {
            res.status(201).json({
                message: "Result Updated SuccessFully"
            })
        }
        else {
            res.status(404).json({
                message: "Result Not Updated!"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Updating Result Failed!"
        });
    });
}

exports.getResults = (req, res, next) => {
    Result.find().then(results => {
        res.status(200).json({
            message: "Results fetched successfully!",
            results: results
        })
    })
}

exports.getResult = (req, res, next) => {
    Result.findOne({ "studentid": req.params.studentid }).then(result => {
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({
                message: "Result Not Found!"
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: "Fetched Result Failed!"
        });
    });
}

exports.deleteResult = (req, res, next) => {
    Result.deleteOne({ studentid: req.params.studentid }).then(result => {
        console.log("result deleted")
        if (result.n > 0) {
            res.status(200).json({ message: "Result Deleted!" });
        }
        else {
            res.status(500).json({ message: "Not Deleted!" });
        }
    }).catch(err => {
        res.status(500).json({
            message: "Deleting Result Failed!"
        });
    });
}