import bcrypt from "bcryptjs";

export const createPasswordHash = async (password) => {
  return await bcrypt.hash(password, 8);
}
