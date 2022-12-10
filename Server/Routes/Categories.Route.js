import express from "express";
import { AddCategory } from "../Controllers/Categories.Controller.js"; 
// import { Logout,Login,refreshToken,Register } from "../Controllers/Users.Controller.js"; 
const CategoriesRouter = express.Router();
 
CategoriesRouter.post('/AddCategory', AddCategory);
// UsersRouter.post('/login', Login);
// UsersRouter.get('/token', refreshToken);
// UsersRouter.delete('/logout', Logout);
 
export default UsersRouter;