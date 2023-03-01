import { Doctor, Patient, Operator } from "../models";

const findUserByEmail = async (email) => {
  let user = {
    table: null,
    type: null,
  };
  const oldDoctor = await Doctor.findOne({ where: { email } });
  const oldPatient = await Patient.findOne({ where: { email } });
  const oldOperator = await Operator.findOne({ where: { email } });

  if (oldDoctor) {
    user.table = oldDoctor;
    user.type = "doctor";
  } else if (oldPatient) {
    user.table = oldPatient;
    user.type = "patient";
  } else if (oldOperator) {
    user.table = oldOperator;
    user.type = "operator";
  }
  return user;
};

export { findUserByEmail };
