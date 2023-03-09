import catchAsync from "../utils/catchAsync.js";
import { Appointment, Test } from "../models/index.js";
import config from "../config/config.js";
import supabaseClient from "@supabase/supabase-js";

const createTest = catchAsync(async (req, res) => {
  const { name, appointment_id, cost, date } = req.body;

  const test = await Test.create({
    name,
    appointment_id,
    cost,
    date,
  });
  res.status(200).json({ message: "Test Registered", test });
});

const uploadTestReport = catchAsync(async (req, res) => {
  const { id } = req.query;
  let form = await req.formData();
  const report = form.get("report");

  if (!test) {
    return res.status(404).json({ message: "Test not found" });
  }
  const { data, error } = await supabaseClient
    .from(config.supabaseBucket)
    .insert([{ report }]);

  const test = await Test.update(
    { report_url: data[0].url },
    { where: { id } }
  );

  res.status(200).json({ message: "Test Report Uploaded", test });
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
