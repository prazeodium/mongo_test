const { Schema, model } = require("mongoose");

const FirstSchema = new Schema({
    country: { type: String },
    city: { type: String },
    name: { type: String },
    location: {
        ll: [Number],
    },

    students: [
        {
            year: Number,
            number: Number,
        },
    ],
});

module.exports = model("First", FirstSchema);
