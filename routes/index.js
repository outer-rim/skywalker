import express from "express";
import authRoute from "./auth.route.js";
import patientRoute from "./patient.route.js";
import doctorRoute from "./doctor.route.js";
import operatorRoute from "./operator.route.js";
import appointmentRoute from "./appointment.route.js";
import testRoute from "./test.route.js";
import roomRoute from "./room.route.js";

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
  {
    path: "/appointment",
    route: appointmentRoute,
  },
  {
    path: "/test",
    route: testRoute,
  },
  {
    path: "/room",
    route: roomRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
