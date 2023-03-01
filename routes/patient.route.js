import express from "express";
import controllers from "../controllers/patient.controller.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();

router.get("/list", verifyToken, controllers.getAllPatients);

export default router;
