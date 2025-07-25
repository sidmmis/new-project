import JWT from "jsonwebtoken";

import wardenModels from "../models/wardenModels.js";
import managerModels from "../models/managerModels.js";
import accountantModels from "../models/accountantModels.js";
import userModels from "../models/userModels.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//user middleware
export const isUser = async (req, res, next) => {
  try {
    const user = await userModels.findById(req.user._id);
    if (user.role !== 0) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

//warden middleware
export const isWarden = async (req, res, next) => {
  try {
    const user = await wardenModels.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

//accountant middleware
export const isAccountant = async (req, res, next) => {
  try {
    const user = await accountantModels.findById(req.user._id);
    if (user.role !== 2) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

//manager middleware
export const isManager = async (req, res, next) => {
  try {
    const user = await managerModels.findById(req.user._id);
    if (user.role !== 3) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
