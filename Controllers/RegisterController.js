const AdminModel = require("../Models/Admin/AdminModel");
const UserTimeRegistor = require("../Models/User/UserTimeRegistor");

const getRegisterData = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.user.id);
    const register = await UserTimeRegistor.find({
      branch_id: admin.branch_id,
    }).populate({
      path: "userid",
      populate: {
        path: "leave",
      },
    });
    const finalRegister = register.filter((el) => el.userid);
    console.log(finalRegister);
    return res.status(200).json({
      success: true,
      register: finalRegister,
      message: "Register Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFilteredRegisterData = async (req, res) => {
  try {
    const { id } = req.params;
    const register = await UserTimeRegistor.find().populate("userid adminid");
    if (id === "all") {
      return res.status(200).json({ register });
    }
    const filteredRegister = register.filter(
      (el) => String(el.adminid.branch_id) === id
    );
    return res.status(200).json({ register: filteredRegister });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStaffMemberByAdmin = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    const adminData = [];
    console.log(admins);
    for (const admin of admins) {
      const users = await userModel.find({ adminId: admin._id });
      console.log("users:", users);
      adminData.push({
        adminId: admin._id,
        adminName: admin.name,
        adminEmail: admin.email,
        users: users,
      });
    }

    return res.status(200).json({
      success: true,
      adminData,
      message: "Staff By Admin Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getRegisterData,
  getFilteredRegisterData,
  getAllStaffMemberByAdmin,
};
