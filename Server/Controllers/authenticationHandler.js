import express from "express";
import passport from "passport";
import "./auth.js";

export const isLoggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      error: true,
      message: "user not authorized",
    });
  }
};

export const getAuth = async (req, res) => {
  try {
    res
      .status(200)
      .send('<a href = "/users/auth/google">authenticate with google</a>');
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
export const getAuthGoogle = async (req, res) => {
  try {
    res.redirect("http://localhost:3000/login");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
export const getAuthSucceed = async (req, res) => {
  try {
    if (req.user) {
      const session = req.session;
      session.user = req.user;
      res.json({
        error: false,
        message: "user authenticated successfully",
        user: req.user,
      });
    } else {
      res.status(403).json({
        error: true,
        message: "user not autorized",
      });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
export const getGoogleLogin = async (req, res) => {
  try {
    res.redirect("http://localhost:3000/success");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
export const getAuthFailure = async (req, res) => {
  try {
    res.status(401).json({
      error: true,
      message: "failed to authenticate",
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    req.logout();
    res.redirect(process.env.LINK_URL);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
