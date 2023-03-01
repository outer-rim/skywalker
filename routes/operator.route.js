import express from "express";
import controllers from "../controllers/operator.controller.js";
const router = express.Router();

router.post("/register", controllers.registerOperator);

export default router;
