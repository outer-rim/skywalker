import express from "express";
import authRoute from "./auth.route.js";
import patientRoute from "./patient.route.js";
import doctorRoute from "./doctor.route.js";
import operatorRoute from "./operator.route.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/patient",
    route: patientRoute,
  },
  {
    path: "/doctor",
    route: doctorRoute,
  },
  {
    path: "/operator",
    route: operatorRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
