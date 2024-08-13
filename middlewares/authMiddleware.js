const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.body.token || req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log(req.user);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "invalid Token ",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error Occured in Authentication ",
    });
  }
};

exports.isOwner = (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.role !== "OWNER") {
      return res.status(401).json({
        success: false,
        message: "You are not authorized Owner",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something error occured: " + error,
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(401).json({
        success: false,
        message: "You are not authorized Admin",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something error occured: " + error,
    });
  }
};
