import catchAsync from "../utils/catchAsync.js";
import { Room } from "../models/index.js";

const getFreeRooms = catchAsync(async (req, res) => {
  const roomList = await Room.findAll({ where: { available: true } });
  res.status(200).json({ message: "Room list", roomList });
});

export default { getFreeRooms };
