const mongoose = require("mongoose");

const StockItemCategorySchema = mongoose.Schema({
    item_category: {
        type: String,
        required: true,
    },
    admin_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("stock-item-category", StockItemCategorySchema);
