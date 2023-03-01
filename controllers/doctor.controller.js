import catchAsync from "../utils/catchAsync.js";
import { findUserByEmail } from "../utils/utility.js";
import { Doctor } from "../models/index.js";
import bcrypt from "bcrypt";

const registerDoctor = catchAsync(async (req, res) => {
  const { name, email, password, license, phone, specialization } = req.body;

  const user = await findUserByEmail(email);
  if (user.table) {
    return res
      .status(409)
      .json({ message: `User already exists (${user.type})` });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const doctor = await Doctor.create({
    name,
    email,
    password: encryptedPassword,
    license,
    phone,
    specialization,
  });
  res.status(200).json({ message: "Doctor Registered", doctor });
});

export default { registerDoctor };
