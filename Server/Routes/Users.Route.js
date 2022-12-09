import express from "express";
import { Register } from "../Controllers/Users.Controller.js"; 
// import { Logout,Login,refreshToken,Register } from "../Controllers/Users.Controller.js"; 
const UsersRouter = express.Router();
 
UsersRouter.post('/register', Register);
// UsersRouter.post('/login', Login);
// UsersRouter.get('/token', refreshToken);
// UsersRouter.delete('/logout', Logout);
 
export default UsersRouter;