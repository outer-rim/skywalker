import express from "express";
import controllers from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/login", controllers.login);

export default router;
