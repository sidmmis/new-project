import express from "express";
import JWT from "jsonwebtoken";
import {
  UserloginController,
  // wardenloginController,
  // accountantloginController,
  // managerloginController,
  userregisterController,
  accountantregisterController,
  managerregisterController,
  wardenregisterController,
  testController,
  forgotPasswordController,
  adminloginController,
  resetpassward,
  getMenu,
  updateMenu,
  // approveReqbymanager,
  // approvemenu,
} from "../controllers/authController.js";
import {
  isAccountant,
  isManager,
  isUser,
  isWarden,
  requireSignIn,
} from "../middlewares/authMiddleware.js";

// import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

//routing

// ////////////////////////////////////////////////////////////////////  register routes

//user  register
router.post("/register", userregisterController);

//warden register
router.post("/wardenregister", wardenregisterController);

//accountant  register
router.post("/accountantregister", accountantregisterController);

// manger register
router.post("/managerregister", managerregisterController);

//forget password
router.post("/forgot-password", forgotPasswordController);

///////////////////////////////////////////////////////     login routes

//user login
router.post("/userlogin", UserloginController);

//admin login
router.post("/adminlogin", adminloginController);

//accountant login
// router.post("/accountantlogin", accountantloginController);
// //manager login
// router.post("/managerlogin", managerloginController);

////////////////////////////////////////////////////////////////// middlewares routes
//isWarden
//isManager
//isAccountant
//isUser

//test controller

router.get("/test", requireSignIn, isWarden, testController);

//forget password
router.post("/forgotpassword", forgotPasswordController);

//reset passward
router.post("/reset-password/:id/:token", resetpassward);

//////////////////////////////////////////////////////////////////////user protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  return res.status(200).send({ ok: true });
});

///////////////////////////////////////////////////////////////////////admin protected route
router.get("/admin-auth", requireSignIn, (req, res, next) => {
  if (isWarden || isManager || isAccountant) {
    // The user is a warden, manager, or accountant
    // next(); // Continue to the next middleware or route handler
    return res.status(200).send({ ok: true });
  }

  // If none of the conditions are met, send a response or do something else
  return res.status(403).send({ error: "Access denied" });
});

////////////////////////////////mess
router.get("/getmenu", getMenu);
router.post("/updatemenu", updateMenu);

export default router;
