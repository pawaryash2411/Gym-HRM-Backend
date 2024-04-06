const ItemBrandModel = require("../../Models/StockManagement/ItemBrand");

const postData = async (req, res) => {
    try {
        const { itemBrandName, admin_id } = req.body;
        const itemData = await ItemBrandModel.create({
            itemBrandName, admin_id
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
        const itemAllData = await ItemBrandModel.find()
        res.status(200).json({ success: true, itemAllData, message: "All Item Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemBrandName, admin_id } = req.body;

        const updatedData = await ItemBrandModel.findByIdAndUpdate(id, {
            itemBrandName, admin_id
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Updated Successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await ItemBrandModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Removed Successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    postData, deleteData, updateData, getAllData
}
