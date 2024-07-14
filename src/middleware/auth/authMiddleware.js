import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secretKey");
      req.auth = decoded;
      next();
    } catch (error) {
      res.json({ message: "Invalid json web token!", error: error });
    }
  } else {
    req.auth = ""
    next()
  }
};
