import catchAsync from "../utils/catchAsync.js";
import { Slot } from "../models/index.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";

const addSlot = catchAsync(async (req, res) => {
  const { doctor_id, starttime, endtime } = req.body;
  const status = true; // Available
  const slot = await Slot.create({
    doctor_id,
    starttime,
    endtime,
    status
  });
  res.status(200).json({ message: "Slot Added", slot });
});

const getSlots = catchAsync(async (req, res) => {
  const { doctor_id } = req.query;

  if (doctor_id) {
    const slots = await Slot.findAll({
      where: {
        doctor_id,
      },
    });
    res.status(200).json({ message: "Slots Fetched", slots });
  }


  const slots = await Slot.findAll({});
  res.status(200).json({ message: "Slots Fetched", slots });
});

const getSlotspec = catchAsync(async (req, res) => {
  const { doctor_id, quedate } = req.body;
  const slots = await Slot.findAll({
    where: {
      [Op.and]: [
      Sequelize.where(Sequelize.fn('DATE', Sequelize.col('starttime')),
      {
        [Op.eq]: Sequelize.fn('DATE', quedate)
      }),
      {
        doctor_id,
      }
    ]
    },
  });
  console.log(slots);
  res.status(200).json({ message: "Slots Fetched", slots });
});

export default { addSlot, getSlots, getSlotspec };
