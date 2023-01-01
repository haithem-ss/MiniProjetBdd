import express from "express";
import cors from "cors";
import { initDriver } from "./Config/database.js";
import * as dotenv from "dotenv";
import AuthRoutes from "./Routes/Users.Auth.Google.Route.js";
import session from "express-session";
import passport from "passport";
import UsersRouter from "./Routes/Users.Route.js";
import cookieParser from "cookie-parser";
import CategoriesRouter from "./Routes/Categories.Route.js";
import ProductsRouter from "./Routes/Products.Route.js";


import CheckoutRouter from "./Routes/Checkout.Route.js";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const app = express();
// Passport middleware
app.use(session({ secret: SECRET }, { resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(
  passport.session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000, httpOnly: true },
  })
);

app.use(
  cookieParser("secret", {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", AuthRoutes);
app.use("/users", UsersRouter);
//app.use("/", AuthRoutes);
app.use("/users",UsersRouter)
app.use("/categories",CategoriesRouter)
app.use("/products",ProductsRouter)
app.use("/checkouts",CheckoutRouter)
app.get("/", function (req, res) {
  res.status(200).send("We are up and running");
});

app.listen(PORT, function () {
  console.log(`Server running on localhost:${PORT}`);
});

//database connection
const uri = `neo4j+s://${process.env.CONNECTION_URL}`;
const user = process.env.DATABASE_USER;
const password = process.env.PASSWORD;

await initDriver(uri, user, password);

export default app;
