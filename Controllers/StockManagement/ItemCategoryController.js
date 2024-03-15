const ItemCategoryModel = require("../../Models/StockManagement/ItemCategory");

const postData = async (req, res) => {
    try {
        const { item_category, admin_id } = req.body;
        const itemData = await ItemCategoryModel.create({
            item_category, admin_id
        });

        res.status(201).json({
            success: true,
            itemData,
            message: "Item Category Added Successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const itemAllData = await ItemCategoryModel.find();
        res.status(200).json({ success: true, itemAllData, message: "All Item Category Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { item_category, admin_id } = req.body;

        const updatedData = await ItemCategoryModel.findByIdAndUpdate(id, {
            item_category, admin_id
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Item Category Updated Successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await ItemCategoryModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Item Category Removed Successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    postData, deleteData, updateData, getAllData
}
