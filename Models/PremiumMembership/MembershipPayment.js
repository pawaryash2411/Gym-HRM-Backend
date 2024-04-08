const mongoose = require("mongoose");

const membershipPaymentSchema = mongoose.Schema({
    email:
    {
        type: String,
        required: true,
    },
    subscriptionModel: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean,
    },
    paidAt: {
        type: Date.now()
    }
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("membership-payment", membershipPaymentSchema);
