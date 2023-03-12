import catchAsync from "../utils/catchAsync.js";
import { Appointment, Test } from "../models/index.js";

const createTest = catchAsync(async (req, res) => {
  const { file_url, name, appointment_id, cost, date } = req.body;

  const test = await Test.create({
    file_url,
    name,
    appointment_id,
    cost,
    date,
  });
  res.status(200).json({ message: "Test Registered", test });
});

const uploadTestReport = catchAsync(async (req, res) => {
  const {file} = req;
  const {path} = file;
  res.status(200).json({ message: "Test Report Uploaded", file_url: path });
});

const getPatientTests = catchAsync(async (req, res) => {
  const appointmentList = await Appointment.findAll({
    where: { patient_id: req.query.id },
  });
  const testList = await Test.findAll({
    where: {
      appointment_id: appointmentList.map((appointment) => appointment.id),
    },
  });
  res.status(200).json({ message: "Test List", testList });
});

export default { createTest, getPatientTests, uploadTestReport };
