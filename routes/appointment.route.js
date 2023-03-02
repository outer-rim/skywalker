import express from "express";
import controllers from "../controllers/appointment.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/create",
  verifyTokenAndAuthorization(["doctor"]),
  controllers.createAppointment
);

router.get(
  "/list",
  verifyTokenAndAuthorization(["operator"]),
  controllers.getAllAppointments
);

export default router;
