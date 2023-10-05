import bcrypt from "bcryptjs";

export const createPasswordHash = async (password) => {
  return await bcrypt.hash(password, 8);
}

export const checkPassword = (password, user) => {
  return bcrypt.compare(password, user)
}

