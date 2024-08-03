import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

export const Signup = asyncHandler(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      res.status(400);
      throw new Error("User already exist");
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    if (newUser) {
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log(`Signup Error ${error}`);
    next(error);
  }
});

export const Login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(user._id, res);

      res.status(201).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.log(`Login Error ${error}`);
    next(error);
  }
});

export const Logout = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "successfully logout" });
  } catch (error) {
    console.log(`Logout Error ${error}`);
    next(error);
  }
});
