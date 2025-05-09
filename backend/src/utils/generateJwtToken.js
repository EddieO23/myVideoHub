import User  from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateJwtToken = async (user) => {
  const secretOrKey = process.env.JWT_SECRET;
  const jwtToken = await jwt.sign(user.toJSON(), secretOrKey, { expiresIn: '1d' });
  return jwtToken;
}