const express = require("express");
const {
  getlocation,
  postdata,
  getdata,
  getsingle,
  putdata,
  postdataAdmin,
  putdataAdmin,
  getsingleAdmin,
  postdataClockIn,
  postClockInOut,
  postdataQR,
  putdataQR,
} = require("../../Controllers/Clock/ClockIn-OutCtrl");
const { requireAuth } = require("../../Middlewares/requireAuth");
const router = express.Router();

router.get("/loaction", getlocation);

router.get("/ALL", getdata);
router.get("/", requireAuth, getsingle);
router.get("/admin/:id", requireAuth, getsingleAdmin);
router.post("/", requireAuth, postdata);
router.post("/qr", requireAuth, postdataQR);
router.put("/qr", requireAuth, putdataQR);
router.post("/admin/:id", requireAuth, postClockInOut);
router.put("/", requireAuth, putdata);
router.put("/admin/:id", requireAuth, putdataAdmin);

module.exports = router;
