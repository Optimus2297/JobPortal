const User = require("../models/user");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Create JWT Token
  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    message: "User created successfuly.",
    data: user,
    token,
  });
});
