const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address"]
    },
    phoneno: {
        type: String,
        required: [true, "Please add the contact phone no"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Contact", contactSchema)