const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const employeeSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true }
})

employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Employee", employeeSchema);