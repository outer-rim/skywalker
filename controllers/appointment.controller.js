import catchAsync from "../utils/catchAsync.js";
import { Appointment } from "../models/index.js";

const createAppointment = catchAsync(async (req, res) => {
  const { patient_id, doctor_id, room, fees, starttime, endtime } = req.body;

  const appointment = await Appointment.create({
    patient_id,
    doctor_id,
    room,
    fees,
    starttime,
    endtime,
  });
  res.status(200).json({ message: "Appointment Registered", appointment });
});

const getAllAppointments = catchAsync(async (req, res) => {
  const appointments = await Appointment.findAll({});
  res.status(200).json({ message: "Appointment List", appointments });
});

export default { createAppointment, getAllAppointments };
