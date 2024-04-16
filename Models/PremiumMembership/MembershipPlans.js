const mongoose = require("mongoose");

const MembershipPlanSchema = mongoose.Schema({
    plan_name: {
        type: String,
        required: true,
    },
    plan_price: {
        type: Number,
        required: true,
    },
    plan_duration: {
        type: Number,
        required: true,
    },
    admin_id: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("membership-plans", MembershipPlanSchema);
