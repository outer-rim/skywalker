import { Sequelize } from "sequelize";

import logger from "../config/logger.js";
import config from "../config/config.js";

//Models Imports
import { PatientModel } from "./patient.js";
import { DoctorModel } from "./doctor.js";
import { OperatorModel } from "./operator.js";

const sequelize = new Sequelize(config.db, {
  logging: false,
});

const Patient = PatientModel(sequelize, Sequelize);
const Doctor = DoctorModel(sequelize, Sequelize);
const Operator = OperatorModel(sequelize, Sequelize);

sequelize.sync({ alter: false }).then(() => {
  logger.info("db and tables have been created");
});

export { Patient, Doctor, Operator };
