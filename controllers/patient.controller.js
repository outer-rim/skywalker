import catchAsync from "../utils/catchAsync.js";
import { Patient } from "../models/index.js";

const getAllPatients = catchAsync(async (req, res) => {
  const patientList = await Patient.findAll({});
  res.status(200).json({ message: "Patient List", patientList });
});

export default { getAllPatients };
