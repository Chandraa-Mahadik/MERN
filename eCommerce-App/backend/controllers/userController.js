import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc Auth user & Get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  // res.send("Okay.");
  const user = await User.findById(req.user._id);
  console.log(user);

  // (res.json({
  //   _id: user._id,
  //   name: user.name,
  //   email: user.email,
  //   isAdmin: user.isAdmin,
  // }))

  // return (res.json({
  //   _id: user._id,
  //   name: user.name,
  //   email: user.email,
  //   isAdmin: user.isAdmin,
  // }));

  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

export { authUser, getUserProfile };
