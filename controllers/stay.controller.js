import catchAsync from "../utils/catchAsync.js";
import { Stay, Room } from "../models/index.js";
import { Op } from "sequelize";
import { Sequelize } from "sequelize";

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
          starttime: {
            [Op.eq]: Sequelize.col("endtime"),
          },
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

const getAlldischarged = catchAsync(async (req, res) => {});
export default { createStay, dischargeStay };
