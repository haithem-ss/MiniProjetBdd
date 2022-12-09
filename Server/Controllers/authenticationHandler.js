import express from "express";
import passport from "passport";
import "./auth.js";

export const isLoggedin = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

export const getAuth = async (req, res) => {
  try {
    res.status(200).send('<a href = "auth/google"> get athanticated</a>');
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
export const getAuthSucceed = async (req, res) => {
  try {
    console.log(req.user);
    res.status(200).send(`Welcome ${req.user.name.givenName}`);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
export const getAuthFailure = async (req, res) => {
  res.status(400).send("Oups! Something went wrong");
};

export const logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
