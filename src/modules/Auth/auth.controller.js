import userModel from "../../../Database/models/userModel.js";
import bcrpyt from "bcrypt";
import { generateToken } from "../../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await userModel.create({ username, email, password });

    res.json({ message: "Signed up successfully!", user: user });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user)
      return res.json({ message: "User doesn't exist, Register instead?" });

    const passwordMatched = bcrpyt.compareSync(password, user.password);

    if (!passwordMatched)
      return res.json({ message: "Password is incorrect!" });

    const token = generateToken(user);

    res.json({ message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

