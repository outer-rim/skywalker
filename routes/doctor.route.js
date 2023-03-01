import express from "express";
import controllers from "../controllers/doctor.controller.js";
const router = express.Router();

router.get("/register", controllers.registerDoctor);

export default router;
