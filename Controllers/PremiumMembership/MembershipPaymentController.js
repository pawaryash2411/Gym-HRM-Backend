const MembershipPayment = require("../../Models/PremiumMembership/MembershipPayment");

const AddPayData = async (req, res) => {
    try {
        const { user_id, subscriptionModel, isPaid } = req.body;
        const payData = await MembershipPayment.create({
            user_id, subscriptionModel, isPaid
        });

        res.status(201).json({
            success: true,
            payData,
            message: "Paid Successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getPayData = async (req, res) => {
    try {
        console.log("user", req.user.id)
        const payData = await MembershipPayment.findOne({ user_id: req.user.id }).populate('user_id');
        res.status(200).json({ success: true, payData, message: "Pay Data Fetched successfully", payData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPayData, AddPayData
}

