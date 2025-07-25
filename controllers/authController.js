import bcrypt from "bcrypt";
import userModels from "../models/userModels.js";
import { comparePassword, hashpassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import wardenModels from "../models/wardenModels.js";
import managerModels from "../models/managerModels.js";
import accountantModels from "../models/accountantModels.js";
import nodemailer from "nodemailer";
import Menu from "../models/messModels.js";

//user registration
export const userregisterController = async (req, res) => {
  try {
    const { name, reg, email, password, phone, hostel } = req.body;
    if (!name || !reg || !email || !phone || !password || !hostel) {
      return res.send({ message: "field empty" });
    }

    //for getting valid college format email id
    const parts = name.split(" "); // Split the string by space
    const firstName = parts[0]; // Get the first part
    const firstNameLowercase = firstName.toLowerCase();

    //for verifying mail format
    if (email != `${firstNameLowercase}.${reg}@mnnit.ac.in`)
      return res.send({ message: "Wrong mail id" });

    const existingUser = await userModels.findOne({ email });
    if (existingUser)
      return res.status(200).send({
        success: false,
        message: "user already exist",
      });

    const existingUserReg = await userModels.findOne({ reg });
    if (existingUserReg)
      return res.status(200).send({
        success: false,
        message: "user already exist",
      });

    const hashedpassword = await hashpassword(password);
    const user = await new userModels({
      name,
      reg,
      email,
      phone,
      hostel,
      password: hashedpassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "User Registration success",
      user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      e,
    });
  }
};

//warden register
export const wardenregisterController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //for verifying mail format
    const hashedpassword = await hashpassword(password);
    const user = await new wardenModels({
      name,
      email,
      password: hashedpassword,
      role,
    }).save();
    return res.status(200).send({
      success: true,
      message: "User Registration success",
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
      e,
    });
  }
};

//accountant register
export const accountantregisterController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //for verifying mail format
    const hashedpassword = await hashpassword(password);
    const user = await new accountantModels({
      name,
      email,
      password: hashedpassword,
      role,
    }).save();
    return res.status(200).send({
      success: true,
      message: "User Registration success",
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
      e,
    });
  }
};

//manager register
export const managerregisterController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //for verifying mail format
    const hashedpassword = await hashpassword(password);
    const user = await new managerModels({
      name,
      email,
      password: hashedpassword,
      role,
    }).save();
    return res.status(200).send({
      success: true,
      message: "User Registration success",
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
      e,
    });
  }
};

//User login
export const UserloginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    //validation
    if (!email || !password || role) {
      return res.status(404).send({
        success: false,
        message: "input field empty",
      });
    }
    //check user
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }

    if (user.blocked === "1")
      return res.status(200).send({
        success: false,
        message: "You are temporarily Blocked ",
      });

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Credential",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        hostel: user.hostel,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//admin login
export const adminloginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    //validation
    if (!email || !password || !role) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user

    let user;

    if (role == 1) user = await wardenModels.findOne({ email });
    else if (role == 2) user = await accountantModels.findOne({ email });
    else if (role == 3) user = await managerModels.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
///////////////////forgot passward
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModels.findOne({ email });

    if (!user) {
      return res.status(404).json({ Status: "User not found" });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: user.email, // Use the user's email here
      subject: "Reset Password Link",
      text: `http://localhost:3000/reset_password/${user._id}/${token}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ Status: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Status: "An error occurred" });
  }
};

/////////reset passward
export const resetpassward = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    JWT.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.json({ Status: "Error with token" });
      } else {
        try {
          const hash = await hashpassword(password);
          console.log(`new hash password is ${hash}`);
          const updatedUser = await userModels.findByIdAndUpdate(
            { _id: id },
            { password: hash }
          );
          if (updatedUser) {
            return res.send({ Status: "Success" });
          } else {
            return res.send({ Status: "User not found" });
          }
        } catch (error) {
          return res.send({ Status: error.message });
        }
      }
    });
  } catch (e) {
    return res.send({ Status: e.message });
  }
};

//test controller
export const testController = (req, res) => {
  return res.status(200).send({
    message: "protected route",
  });
};
/////////////////////////////////////////gettting menu from database

export const getMenu = async (req, res) => {
  try {
    const menuData = await Menu.find({});
    return res.status(200).send(menuData);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/////////////////////////////////////////updating menu in database

/////////////////////////////////////////updating menu in database

export const updateMenu = async (req, res) => {
  try {
    const { day, time, updatedtext } = req.body;
    console.log(day);
    console.log(time);

    // Determine the field to update based on the 'time' value
    let updateField = "";
    if (time === "breakfast") {
      updateField = "breakfast";
    } else if (time === "lunch") {
      updateField = "lunch";
    } else if (time === "dinner") {
      updateField = "dinner";
    }

    // Use the Mongoose model to find and update the document based on 'dayOfWeek'
    const updatedMenu = await Menu.findOneAndUpdate(
      { dayOfWeek: day },
      { [updateField]: updatedtext },
      { new: true } // Set to true to return the updated document
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    // Respond with the updated data or a success message
    return res.status(200).json(updatedMenu);
  } catch (error) {
    console.error("Error updating menu data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
