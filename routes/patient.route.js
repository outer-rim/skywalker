import express from "express";
import controllers from "../controllers/patient.controller.js";
const router = express.Router();

router.get("/list", controllers.getAllPatients);

export default router;
