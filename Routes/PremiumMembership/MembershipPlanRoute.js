const express = require("express");
const { postData, deleteData, updateData, getAllData, getSinglePlan } = require("../../Controllers/PremiumMembership/MembershipPlansController");
const router = express.Router();

router.get("/", getAllData)
router.post("/", postData)
router.put("/:id", updateData)
router.delete("/:id", deleteData)
router.get("/plan/:id", getSinglePlan)
module.exports = router;