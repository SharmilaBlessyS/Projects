const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    quote : {
        type:[String],
        default: []  // Initialize as an empty array
    }
})

const User = mongoose.model("quote",UserSchema);
module.exports = User;