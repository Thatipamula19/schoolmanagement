const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adiminSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

adiminSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Adimin", adiminSchema);