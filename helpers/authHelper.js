import bcrypt from "bcrypt";

export const hashpassword = async (password) => {
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    return hashedpassword;
  } catch (e) {
    console.log("password not hashed");
  }
};

export const comparePassword = async (password, hashedpassword) => {
  return bcrypt.compare(password, hashedpassword);
};
