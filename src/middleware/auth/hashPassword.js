import bcrypt from "bcrypt"

export const hashPassword = async (req, res, next) => {
  let {password} = req.body; 

  let hashedPassword = bcrypt.hashSync(password, 8)
  password = hashedPassword;

  req.body = {
    ...req.body,
    password
  }

  next()
}