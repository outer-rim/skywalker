import catchAsync from "../utils/catchAsync.js";
import { Appointment, Test } from "../models/index.js";
import config from "../config/config.js";
import supabaseClient from "../utils/supabase.js";
import fs from "fs";

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
  console.log(id);
  const { file } = req;
  const { path } = file;
  console.log(path);

  // const fileBody = fs.readFileSync(path);

  // const { data, error } = await supabaseClient.storage
  //   .from(config.supabaseBucket)
  //   .upload(path, fileBody.buffer, {
  //     cacheControl: "3600",
  //     upsert: false,
  //   });

  // console.log(data);

  // if (error) {
  //   console.log(error);
  //   return res.status(500).json({ message: "Error Uploading Test Report" });
  // }
  const test = await Test.update({ file_url: path }, { where: { id } });
  res.status(200).json({ message: "Test Report Uploaded" });
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
