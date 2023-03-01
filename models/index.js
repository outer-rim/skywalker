import { Sequelize } from "sequelize";

import { info } from "../config/logger";
import config from "../config/config";

//Models Imports
import { PatientModel } from "./patient";

const sequelize = new Sequelize(config.db, {
  logging: false,
});

const Patient = PatientModel(sequelize, Sequelize);

sequelize.sync({ alter: true }).then(() => {
  info("db and tables have been created");
});

export default {
  Patient,
};
