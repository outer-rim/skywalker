import catchAsync from "../utils/catchAsync.js";
import { Patient } from "../models/index.js";

const addPatient = catchAsync(async (req, res) => {
  const { name, address, gender, age, phone } = req.body;
  const patient = await Patient.create({
    name,
    address,
    gender,
    age,
    phone,
  });
  res.status(200).json({ message: "Patient Registered", patient });
});

const getAllPatients = catchAsync(async (req, res) => {
  const patientList = await Patient.findAll({});
  res.status(200).json({ message: "Patient List", patientList });
});

export default { addPatient, getAllPatients };
