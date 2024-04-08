const MembershipPlanModel = require("../../Models/PremiumMembership/MembershipPlans");

const postData = async (req, res) => {
    try {
        const { plan_name, plan_duration, plan_price, admin_id } = req.body;
        const itemData = await MembershipPlanModel.create({
            plan_name, plan_duration, plan_price, admin_id
        });

        res.status(201).json({
            success: true,
            itemData,
            message: "Added Successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const itemAllData = await MembershipPlanModel.find()
        res.status(200).json({ success: true, itemAllData, message: "All Item Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { plan_name, plan_duration, plan_price, admin_id } = req.body;

        const updatedData = await MembershipPlanModel.findByIdAndUpdate(id, {
            plan_name, plan_duration, plan_price, admin_id
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Updated Successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await MembershipPlanModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Removed Successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const getSinglePlan = async (req, res) => {
    try {
        const { id } = req.params;

        const singleData = await MembershipPlanModel.findById(id);

        res.status(200).json({ success: true, message: "Single Fetched Successfully", singleData });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    postData, deleteData, updateData, getAllData, getSinglePlan
}
