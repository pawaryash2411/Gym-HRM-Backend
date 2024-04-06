const mongoose = require("mongoose");

const GymProductsSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    itemBrand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item-brand",
    },
    itemQuantity: {
        type: Number,
        required: true,
    },
    item_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stock-item-category",
    },
    total_price: {
        type: Number,
        required: true,
    },
    admin_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("gym-products", GymProductsSchema);
