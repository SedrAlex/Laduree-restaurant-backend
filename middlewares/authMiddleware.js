const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized,please login.");
    }
    //Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    //Get user id from token
    const user = await User.findById(verified.id).select("-password");

    //user not found
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    //user is suspended
    if (user.role === "suspended") {
      res.status(400);
      throw new Error("User suspended, please contact support.");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized,please login.");
  }
});
const verifiedOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isVerified) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, account not verified");
  }
});

const supervisorOnly = asyncHandler(async (req, res, next) => {
  if (req.user.role === "supervisor" || req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a supervisor");
  }
});

const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

const restrictTo = (...roles) => {
  // roles => ['admin', 'lead-guide']

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
    }
    next();
  };
};



module.exports = {
  protect,
  restrictTo,
  verifiedOnly,
  supervisorOnly,
  adminOnly,
};
