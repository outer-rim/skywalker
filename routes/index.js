import express from "express";
import patientRoute from "./patient.route.js";
import doctorRoute from "./doctor.route.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/patient",
    route: patientRoute,
  },
  {
    path: "/doctor",
    route: doctorRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
