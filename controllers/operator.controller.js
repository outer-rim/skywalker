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

const getOperators = catchAsync(async (req, res) => {
  const { id } = req.query;
  if (id) {
    const operator = await Operator.findOne({ where: { id } });
    return res.status(200).json({ operator });
  }
  const operators = await Operator.findAll({});
  res.status(200).json({ operators });
});

export default { registerOperator, getOperators };
