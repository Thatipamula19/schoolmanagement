const mongoose = require("mongoose");

const adimisionSchema = mongoose.Schema({
    studentid: { type: String, required: true },
    stdname: { type: String, required: true },
    stdfathername: { type: String, required: true },
    stdgender: { type: String, required: true },
    stddob: { type: String, required: true },
    stdmobile: { type: String, required: true },
    stdemail: { type: String, required: true },
    stdclass: { type: String, required: true },
    stdaddress: { type: String, required: true }


});

module.exports = mongoose.model("Adimision", adimisionSchema);

