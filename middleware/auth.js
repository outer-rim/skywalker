import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { extractToken } from "../utils/utility.js";

const verifyToken = (req, res, next) => {
  const extractedToken = extractToken(req);
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    extractedToken;

  if (!token) {
    return res.status(403).send("token is required for authentication");
  }
  try {
    console.log(token);
    const decoded = jwt.verify(token, config.jwtSecret);
    console.log(decoded);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
