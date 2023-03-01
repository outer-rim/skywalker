import { Doctor, Patient, Operator } from "../models/index.js";

const findUserByEmail = async (email) => {
  let user = {
    table: null,
    type: null,
  };
  const oldDoctor = await Doctor.findOne({ where: { email }, raw: true });
  // const oldPatient = await Patient.findOne({ where: { email } });
  const oldOperator = await Operator.findOne({ where: { email }, raw: true });

  if (oldDoctor) {
    user.table = oldDoctor;
    user.type = "doctor";
    // } else if (oldPatient) {
    // user.table = oldPatient;
    // user.type = "patient";
  } else if (oldOperator) {
    user.table = oldOperator;
    user.type = "operator";
  }
  return user;
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

export { findUserByEmail, extractToken };
