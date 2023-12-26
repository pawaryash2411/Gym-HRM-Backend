const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String ,required: true , unique: true},
    gender: { type: String , required: true },
    contact: { type: String , required: true },
    password: { type: String, required: true},
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("user", userSchema);
