import express from "express";
import controllers from "../controllers/patient.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/create",
  verifyTokenAndAuthorization(["operator"]),
  controllers.addPatient
);

router.get(
  "/list",
  verifyTokenAndAuthorization(["doctor", "operator"]),
  controllers.getAllPatients
);

export default router;
