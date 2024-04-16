const mongoose = require("mongoose");

const membershipPaymentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    subscriptionModel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "membership-plans",
    },
    isPaid: {
        type: Boolean,
    },
    paidAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("membership-payment", membershipPaymentSchema);
