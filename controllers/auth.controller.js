import catchAsync from "../utils/catchAsync.js";
import { findUserByEmail } from "../utils/utility.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user.table) {
    return res.status(404).json({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.table.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  console.log(user.table);
  const token = jwt.sign(
    { id: user.table.id, email: user.table.email, role: user.type },
    config.jwtSecret,
    {
      expiresIn: "2h",
    }
  );
  res.status(200).json({ message: "Login Successful", token });
});

export default { login };
