import bcrypt from 'bcrypt';

export const hashPassword = async (originalPassword) => {
    const hashedPassword = await bcrypt.hash(originalPassword, 16);
    return hashedPassword;
  }

export const comparePassword = async (originalPassword, dbPassword) => {
    const isMatch = await bcrypt.compare(originalPassword, dbPassword);
    return isMatch;
  }