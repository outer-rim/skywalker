import catchAsync from "../utils/catchAsync.js";
import { Treatment, Test, Appointment, Patient } from "../models/index.js";

const createTreatment = catchAsync(async (req, res) => {
  const {
    patient_id,
    doctor_id,
    file_url,
    illness_details,
    test_id,
    procedure_id,
    stay_id,
    date,
  } = req.body;

  const treatment = await Treatment.create({
    patient_id,
    doctor_id,
    file_url,
    illness_details,
    test_id,
    procedure_id,
    stay_id,
    date,
  });
  res.status(200).json({ message: "Treatment registered", treatment });
});

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

const uploadTreatmentReport = catchAsync(async (req, res) => {
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
  const test = await Treatment.update({ file_url: path }, { where: { id } });
  res.status(200).json({ message: "Treatment Report Uploaded" });
});

const getDoctorTreatments = catchAsync(async (req, res) => {
  console.log(req.query.id);
  const treatments = await Treatment.findAll({
    where: { doctor_id: req.query.id },
  });
  res.status(200).json({ message: "Treatment List", treatments });
});

export default { createTreatment, getDoctorTreatments, uploadTreatmentReport };
