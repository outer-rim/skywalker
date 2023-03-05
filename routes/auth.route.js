import express from "express";
import controllers from "../controllers/auth.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post("/login", controllers.login);
router.get(
  "/details",
  verifyTokenAndAuthorization(["operator", "doctor", "admin"]),
  controllers.getDetails
);

export default router;
