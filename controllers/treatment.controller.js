import catchAsync from "../utils/catchAsync.js";
import { Treatment, Test } from "../models/index.js";

const createTreatment = catchAsync(async (req, res) => {
  const { patient_id, doctor_id, illness_details, f, phone, role } = req.body;

  const operator = await Treatment.create({
    email,
    password: encryptedPassword,
    name,
    address,
    phone,
    role,
  });
  res.status(200).json({ message: "Operator Registered", operator });
});

export default { createTreatment };
