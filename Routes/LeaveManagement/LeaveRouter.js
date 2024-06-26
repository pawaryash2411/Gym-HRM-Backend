const express = require("express");
const {
  getdata,
  getalldata,
  postdata,
  putdata,
  deletedata,
} = require("../../Controllers/LeaveManagement/LeaveController");
const {
  authMiddleware,
  requireAuth,
} = require("../../Middlewares/requireAuth");
const router = express.Router();

router.get("/", requireAuth, getalldata);
router.get("/:id", getdata);
router.post("/", requireAuth, postdata);
router.put("/:id", putdata);
router.delete("/:id", deletedata);

module.exports = router;
