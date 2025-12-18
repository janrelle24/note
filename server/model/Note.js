const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    filename: { type: String, required: true, unique:true },
    content: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Note", noteSchema);