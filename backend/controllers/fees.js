const Fees = require("../models/fees");

exports.addFees = (req, res, next) => {
    const fees = new Fees({
        studentid: req.body.studentid,
        stdname: req.body.stdname,
        stdfathername: req.body.stdfathername,
        stdclass: req.body.stdclass,
        stdmobile: req.body.stdmobile,
        totalamount: req.body.totalamount,
        paidamount: req.body.paidamount,
        feeterm: req.body.feeterm,
        paymentmode: req.body.paymentmode,
        paymentdate: req.body.paymentdate
    });

    fees.save().then(addFees => {
        console.log(addFees);
        res.status(201).json({
            message: "Fees Added Successfully!",
            fees: {
                ...addFees,
                id: addFees._id
            }
        })
    }).catch(err => {
        res.status(501).json({
            message: "Fees Added Failed!"
        });
    });
}

exports.updateFees = (req, res, next) => {
    const fees = new Fees({
        _id: req.body.id,
        studentid: req.body.studentid,
        stdname: req.body.stdname,
        stdfathername: req.body.stdfathername,
        stdclass: req.body.stdclass,
        stdmobile: req.body.stdmobile,
        totalamount: req.body.totalamount,
        paidamount: req.body.paidamount,
        feeterm: req.body.feeterm,
        paymentmode: req.body.paymentmode,
        paymentdate: req.body.paymentdate
    });

    Fees.updateOne({ studentid: req.params.studentid }, fees).then(updatedFees => {
        console.log(updatedFees);
        if (updatedFees.n > 0) {
            res.status(200).json({
                message: "Fees Updated Successfully!"
            });
        }
        else {
            res.status(500).json({
                message: "Not Updated!"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Updating Failed!"
        });
    });

}

exports.getFeeses = (req, res, next) => {
    Fees.find().then(feeses => {
        res.status(201).json({
            message: "Feeses fechted Successfully",
            feeses: feeses
        })

    })
}

exports.getFees = (req, res, next) => {
    Fees.findOne({ "studentid": req.params.studentid }).then(fees => {
        console.log(fees);
        if (fees) {
            res.status(200).json(fees);
        }
        else {
            res.status(404).json({
                message: "No Record Found!"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Fetched Student Fees Failed!"
        });
    });
}

exports.deleteFees = (req, res, next) => {
    Fees.deleteOne({ "studentid": req.params.studentid }).then(fees => {
        console.log("fees Deleted");
        if (fees.n > 0) {
            res.status(200).json({
                message: "Fees Deleted!"
            })
        }
        else {
            res.status(500).json({
                message: "Fees not Deleted"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Deleting Fees Failed!"
        });
    });
}