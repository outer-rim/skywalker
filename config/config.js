import path from "path";
const __dirname = path.resolve();

import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "/.env") });

const envVars = process.env;
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  db: envVars.DATABASE_STRING,
  awsKeys: {
    accessKeyId: envVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: envVars.AWS_SECRET_KEY,
  },
  privateBucket: envVars.PUBLIC_BUCKET,
};
