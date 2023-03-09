import catchAsync from "../utils/catchAsync.js";
import { findUserByEmail } from "../utils/utility.js";
import { Doctor } from "../models/index.js";
import bcrypt from "bcrypt";

const registerDoctor = catchAsync(async (req, res) => {
  const {
    name,
    email,
    password,
    address,
    license,
    phone,
    position,
    specialization,
  } = req.body;

  const user = await findUserByEmail(email);
  if (user.table) {
    return res
      .status(409)
      .json({ message: `User already exists (${user.type})` });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const doctor = await Doctor.create({
    email,
    password: encryptedPassword,
    name,
    address,
    phone,
    license,
    position,
    specialization,
  });
  res.status(200).json({ message: "Doctor Registered", doctor });
});

const getDoctors = catchAsync(async (req, res) => {
  const { id } = req.query;
  if (id) {
    const doctor = await Doctor.findOne({ where: { id } });
    return res.status(200).json({ doctor });
  }
  const doctors = await Doctor.findAll({});
  res.status(200).json({ doctors });
});

export default { registerDoctor, getDoctors };
