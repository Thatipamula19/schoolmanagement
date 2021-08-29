const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
    studentid: { type: String, required: true },
    stdname: { type: String, required: true },
    stdclass: { type: String, required: true },
    telugu: { type: Number, required: true },
    hindi: { type: Number, required: true },
    english: { type: Number, required: true },
    maths: { type: Number, required: true },
    science: { type: Number, required: true },
    social: { type: Number, required: true },
})

module.exports = mongoose.model("Result", resultSchema);