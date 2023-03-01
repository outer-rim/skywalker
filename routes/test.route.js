import express from "express";
import controllers from "../controllers/test.controller.js";
const router = express.Router();

router.get("/", controllers.testServer);

export default router;
