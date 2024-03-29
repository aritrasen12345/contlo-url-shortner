import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

// Import DB Models
import User from "../../models/User.js";

// Import Config
import config from "../../config/config.js";

const logInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email }).select(
      "_id name email password"
    );

    // If Not found then send "No User Found"
    if (!foundUser) {
      return res.status(404).json({
        status: false,
        message: "USER NOT FOUND!",
        data: [],
      });
    }

    const matchedPassword = await bcrypt.compare(password, foundUser.password);

    // If password doesn't match send Invalid Password
    if (!matchedPassword) {
      return res.status(406).json({
        status: false,
        message: "INVALID PASSWORD!",
        data: [],
      });
    }

    // Sign the token
    const token = JWT.sign({ id: foundUser._id }, config.JWT_ACTIVATE, {
      expiresIn: "7d",
    });

    // If everything works fine then return Authentication Successful
    return res.status(200).json({
      status: true,
      message: "LOGIN SUCCESSFUL!",
      data: { token },
    });
  } catch (err) {
    next(err);
  }
};

export default logInController;
