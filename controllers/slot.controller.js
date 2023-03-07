import catchAsync from "../utils/catchAsync.js";
import { Slot } from "../models/index.js";

const addSlot = catchAsync(async (req, res) => {
  const { doctor_id, starttime, endtime } = req.body;
  const slot = await Slot.create({
    doctor_id,
    starttime,
    endtime,
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

export default { addSlot, getSlots };
