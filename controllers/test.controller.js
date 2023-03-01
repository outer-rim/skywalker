import catchAsync from "../utils/catchAsync.js";

const testServer = catchAsync(async (req, res) => {
  res.status(200).json({ message: "API Working" });
});

export default { testServer };
