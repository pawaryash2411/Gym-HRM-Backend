const GymProductModel = require("../../Models/StockManagement/GymProduct");

const postData = async (req, res) => {
    try {
        const { itemName, itemPrice, item_category, admin_id, itemQuantity } = req.body;
        const itemData = await GymProductModel.create({
            itemName, itemPrice, item_category, admin_id, itemQuantity
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
        const itemAllData = await GymProductModel.find().populate('item_category');
        res.status(200).json({ success: true, itemAllData, message: "All Item Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, itemPrice, item_category, admin_id, itemQuantity } = req.body;

        const updatedData = await GymProductModel.findByIdAndUpdate(id, {
            itemName, itemPrice, item_category, admin_id, itemQuantity
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Updated Successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await GymProductModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Removed Successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    postData, deleteData, updateData, getAllData
}
