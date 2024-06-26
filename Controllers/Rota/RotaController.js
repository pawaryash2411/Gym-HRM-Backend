const AdminModel = require("../../Models/Admin/AdminModel");
const rotaModal = require("../../Models/Rota/RotaModel");
const SuperAdminModel = require("../../Models/SuperAdmin/SuperAdminModel");
const userModel = require("../../Models/User/userModel");

const postData = async (req, res) => {
  try {
    const { shift, userIds: dirtyUserIds, dates: dirtyDates } = req.body;
    const userIds = JSON.parse(dirtyUserIds);
    const dates = JSON.parse(dirtyDates);
    for (const userId of userIds) {
      const user = await userModel.findById(userId);
      const exists = await rotaModal.findOne({ employeeid: userId });
      const rotas = dates.map((el) => ({
        date: el,
        shift,
      }));
      if (!exists) {
        await rotaModal.create({
          employeeid: userId,
          employeename: user.name,
          rota: rotas,
        });
      } else {
        rotas.forEach((rota) => exists.rota.push(rota));
        await exists.save();
      }
    }

    res.status(201).json({
      success: true,
      message: "Rota Data Added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getData = async (req, res) => {
  const { id } = req.user;
  const admin = await AdminModel.findById(id);
  let isSuperAdmin = false;
  if (!admin) {
    const finalAdmin = await SuperAdminModel.findById(id);
    if (!finalAdmin) {
      return res.status(500).json({ message: "No user" });
    }
    isSuperAdmin = true;
  }
  try {
    const rotaData = await rotaModal.find().populate("employeeid rota.shift");
    const filtered = isSuperAdmin
      ? rotaData.filter((el) => el.employeeid)
      : rotaData.filter(
          (el) => String(el.employeeid?.branch_id) === String(admin.branch_id)
        );

    res.status(200).json({
      success: true,
      rotaData: filtered,
      message: "Rota Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const checkRota = async (req, res) => {
  const { date } = req.params;
  const { id } = req.user;
  try {
    const rotaData = await rotaModal
      .findOne({ employeeid: id })
      .populate("employeeid rota.shift");
    const filtered = rotaData?.rota?.find((el) => date === el.date);
    if (!filtered) {
      throw new Error("NO rota");
    }
    res.status(200).json({
      success: true,
      rotaData: {
        rota: filtered,
        shift: true,
      },
      message: "Rota Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const checkRotaAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const rotaData = await rotaModal
      .findOne({ employeeid: id })
      .populate("employeeid");
    res.status(200).json({
      success: true,
      rotaData: {
        rota: rotaData?.rota,
        shift: rotaData?.employeeid?.attendense_calculation,
      },
      message: "Rota Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterData = async (req, res) => {
  try {
    const { employeename, starttime, endtime } = req.query;

    const filter = {};
    if (employeename) {
      filter.employeename = employeename;
    }
    if (starttime) {
      filter.starttime = { $gte: new Date(starttime) };
    }
    if (endtime) {
      filter.endtime = { $lte: new Date(endtime) };
    }

    const rotaData = await rotaModal.find(filter);

    res.status(200).json({
      success: true,
      rotaData,
      message: "Filtered Rota Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { shift } = req.body;
    console.log(shift);
    const updatedData = await rotaModal.findByIdAndUpdate(
      id,
      {
        rota: JSON.parse(shift),
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      updatedData,
      message: "Rota Data Updated successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const { rota } = req.body;
    const deletedData = await rotaModal.findByIdAndUpdate(id, {
      rota: JSON.parse(rota),
    });

    res.status(200).json({
      success: true,
      deletedData,
      message: "Rota Data Deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getsingledata = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    const data = await rotaModal
      .findOne({ employeeid: id })
      .populate("rota.shift");

    if (data) {
      res.status(200).json({
        success: true,
        rotaData: data,
        message: "data found successfully",
      });
    } else {
      res.status(401).json({
        success: false,
        rotaData: data,
        message: "data found not found in rota",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  postData,
  getData,
  updateData,
  deleteData,
  checkRota,
  filterData,
  checkRotaAdmin,
  getsingledata,
};
