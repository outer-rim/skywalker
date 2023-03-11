import catchAsync from "../utils/catchAsync.js";
import { Stay, Room, Patient } from "../models/index.js";
import { Op } from "sequelize";
import { Sequelize } from "sequelize";
import pg from 'pg';
const { Client } = pg;
import loginfo from "../config/pg_details.js";

const createStay = catchAsync(async (req, res) => {
  const { patient_id, room } = req.body;
  const starttime = new Date();
  const stay = await Stay.create({
    patient_id,
    room,
    starttime,
  });
  const e_room = await Room.update(
    { available: false },
    {
      where: {
        room_number: room,
      },
    }
  );
  res.status(200).json({ message: "Stay Added", stay });
});

const dischargeStay = catchAsync(async (req, res) => {
  const stay = await Stay.findOne({
    where: {
      [Op.and]: [
        { patient_id: req.body.id },
        {
          endtime:null
        },
      ],
    },
  });
  const date = new Date();
  if (!stay) {
    res.status(404).json({ message: "user not found" });
  }
  const del = await Room.update(
    { available: true },
    {
      where: {
        room_number: stay.room,
      },
    }
  );
  const del2 = await Stay.update(
    { endtime: date },
    {
      where: {
        id: stay.id,
      },
    }
  );
  res.status(200).json({ message: "Discharged Successfully" });
});

const getAlldischarged = catchAsync(async (req, res) => {
  const client = new Client(loginfo);
  client.connect();
  const query = 'SELECT treatment.id, patient.id AS patient_id, patient.name, stay.starttime, stay.endtime, patient.phone FROM treatment, stay, patient WHERE stay.starttime < stay.endtime AND stay.patient_id = patient.id AND treatment.stay_id = stay.id';
  const discharge = await client.query(query);
  client.end();
  res.status(200).json(discharge.rows);
});

const getAlladmitted = catchAsync(async (req, res) => {
  const client = new Client(loginfo);
  client.connect();
  const query = 'SELECT treatment.id, patient.id AS patient_id, patient.name, stay.starttime, stay.endtime, patient.phone FROM treatment, stay, patient WHERE stay.starttime < stay.endtime AND stay.patient_id = patient.id AND treatment.stay_id = stay.id';
  const admitted = await client.query(query);
  client.end();
  res.status(200).json(admitted.rows);
});

export default { createStay, dischargeStay, getAlldischarged, getAlladmitted };
