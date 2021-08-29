const mongoose = require("mongoose");

const feesSchema = mongoose.Schema({
    studentid: { type: String, required: true },
    stdname: { type: String, required: true },
    stdfathername: { type: String, required: true },
    stdclass: { type: String, required: true },
    stdmobile: { type: String, required: true },
    totalamount: { type: String, required: true },
    paidamount: { type: String, required: true },
    feeterm: { type: String, required: true },
    paymentmode: { type: String, required: true },
    paymentdate: { type: String, required: true }


})

module.exports = mongoose.model("Fees", feesSchema);