import bcrypt from 'bcrypt';

export const hashPassword = async (originalPassword) => {
    const hashedPassword = await bcrypt.hash(originalPassword, 16);
    return hashedPassword;
  }