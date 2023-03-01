import catchAsync from "../utils/catchAsync.js";
import { findUserByEmail } from "../utils/utility.js";
import { Operator } from "../models/index.js";
import bcrypt from "bcrypt";

const registerOperator = catchAsync(async (req, res) => {
  const { email, password, name, address, phone, role } = req.body;

  const user = await findUserByEmail(email);
  if (user.table) {
    return res
      .status(409)
      .json({ message: `User already exists (${user.type})` });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const operator = await Operator.create({
    email,
    password: encryptedPassword,
    name,
    address,
    phone,
    role,
  });
  res.status(200).json({ message: "Operator Registered", operator });
});

export default { registerOperator };
