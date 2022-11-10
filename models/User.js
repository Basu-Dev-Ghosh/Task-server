const mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    hobbies: {
        type: String,
    },
});

const User = new mongoose.model("User", UsersSchema);
module.exports = User;
