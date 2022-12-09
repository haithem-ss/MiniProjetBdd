import express from "express";
import {
  getAuth,
  getAuthSucceed,
  getAuthFailure,
  isLoggedin,
  logout,
} from "../Controllers/authenticationHandler.js";
import "../Controllers/auth.js";
import passport from "passport";
const router = express.Router();

//

router.get("/", getAuth);
router.get("/auth/success", isLoggedin, getAuthSucceed);
router.get("/auth/failure", getAuthFailure);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/auth/success",
  })
);
router.get("/logout", logout);
export default router;
