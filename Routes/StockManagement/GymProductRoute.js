const express = require("express");
const { postData, deleteData, updateData, getAllData } = require("../../Controllers/StockManagement/GymProductController");
const router = express.Router();

router.get("/", getAllData)
router.post("/", postData)
router.put("/:id", updateData)
router.delete("/:id", deleteData)

module.exports = router;
