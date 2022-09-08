const { Schema, model } = require("mongoose");

const SecondSchema = new Schema({
    country: { type: String },
    overallStudents: { type: Number },
});

module.exports = model("Second", SecondSchema);
