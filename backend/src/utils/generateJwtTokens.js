import User from "../model/userSchema.js"

export const generateJwtTokens = async (user) => {
  const secretOrKey = process.env.JWT_SECRET;
  const jwtToken = await 
}