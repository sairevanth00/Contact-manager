const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please add the username"]
    },
    email: {
        type: String,
        require: [true, "Please add the email address"],
        unique: [true, "Email address already registered"]
    },
    password: {
        type: String,
        require: [true, "Please add the user password"],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);