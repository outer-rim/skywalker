import express from "express";
import controllers from "../controllers/stay.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/create",
  verifyTokenAndAuthorization(["operator"]),
  controllers.createStay
);

router.post(
  "/discharge",
  verifyTokenAndAuthorization(["operator"]),
  controllers.dischargeStay
);

export default router;
