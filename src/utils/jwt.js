import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.username,
      email: user.email,
    },
    "secretKey"
  );
};
