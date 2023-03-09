import express from "express";
import controllers from "../controllers/treatment.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/create",
  verifyTokenAndAuthorization(["operator", "doctor"]),
  controllers.createTreatment
);

router.get(
  "/list/doctor",
  verifyTokenAndAuthorization(["operator", "doctor"]),
  controllers.getDoctorTreatments
);

export default router;
