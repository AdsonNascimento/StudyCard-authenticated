import bcrypt from "bcryptjs";

export const createPasswordHash = async (password) => {
  return await bcrypt.hash(password, 8);
}

// Função para verificar a senha
export const checkPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
}