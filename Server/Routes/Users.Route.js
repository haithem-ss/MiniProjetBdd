import express from "express";
import { Register, Login ,verifyEmail,refreshToken,getUsers} from "../Controllers/Users.Controller.js";
// import { Logout,Login,refreshToken,Register } from "../Controllers/Users.Controller.js";
const UsersRouter = express.Router();

UsersRouter.post("/register", Register);
UsersRouter.get("/all", getUsers);
UsersRouter.post("/register/VerifyEmail", verifyEmail);
UsersRouter.post("/login", Login);
UsersRouter.get('/refreshToken', refreshToken);
// UsersRouter.delete('/logout', Logout);

export default UsersRouter;
