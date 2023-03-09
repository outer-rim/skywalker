import catchAsync from "../utils/catchAsync.js";
import { Patient, Appointment } from "../models/index.js";

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

const getTreatedPatients = catchAsync(async (req, res) => {
  const { doctor_id } = req.query;
  const appointmentList = await Appointment.findAll({ where: { doctor_id } });
  const patients = await Patient.findAll({
    where: {
      id: appointmentList.map((appointment) => appointment.patient_id),
    },
  });
  res.status(200).json({ message: "Patient List", patients });
});

const getInvoice = catchAsync(async (req, res) => {
  const { id } = req.query;
  fs.writeFile("./tmp/geojson.json", JSON.stringify(geoJSON), (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data saved");
    res.download(fileLocation, function (err) {
      console.log(err);
    });
  });
});

export default { addPatient, getAllPatients, getTreatedPatients, getInvoice };
