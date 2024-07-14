import userModel from "../../../Database/models/userModel.js";

export const validateUserName = async (req, res, next) => {
  const {username} = req.body ;

  const user = await userModel.findOne({
    username
  })

  if (user) return res.json({message : "User already registered, Login instead?"})

  next()
}