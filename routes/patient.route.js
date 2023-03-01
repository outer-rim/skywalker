import express from "express";
import controllers from "../controllers/patient.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.get(
  "/list",
  verifyTokenAndAuthorization(["doctor"]),
  controllers.getAllPatients
);

export default router;
