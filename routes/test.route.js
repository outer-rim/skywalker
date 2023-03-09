import express from "express";
import controllers from "../controllers/test.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/create",
  verifyTokenAndAuthorization(["doctor", "operator"]),
  controllers.createTest
);

router.post(
  "/upload",
  verifyTokenAndAuthorization(["doctor", "operator"]),
  controllers.uploadTestReport
);

router.get(
  "/list/patient",
  verifyTokenAndAuthorization(["doctor", "operator"]),
  controllers.getPatientTests
);

export default router;
