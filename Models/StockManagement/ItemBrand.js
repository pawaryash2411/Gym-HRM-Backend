const mongoose = require("mongoose");

const ItemBrandSchema = mongoose.Schema({
    itemBrandName: {
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

module.exports = mongoose.model("item-brand", ItemBrandSchema);
