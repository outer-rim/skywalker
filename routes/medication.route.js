import express from "express";
import controllers from "../controllers/medication.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/add",
  verifyTokenAndAuthorization(["operator"]),
  controllers.addMedication
);

router.get(
  "/list",
  verifyTokenAndAuthorization(["operator"]),
  controllers.getMedications
);

export default router;
