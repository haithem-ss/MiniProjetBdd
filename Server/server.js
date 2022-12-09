import express from "express";
import cors from "cors";
import { initDriver } from "./Config/database.js";
import * as dotenv from "dotenv";
import AuthRoutes from "./Routes/index.js";
import session from "express-session";
import passport from "passport";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const app = express();
// Passport middleware
app.use(session({ secret: SECRET }, { resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", AuthRoutes);

app.listen(PORT, function () {
  console.log(`Server running on localhost:${PORT}`);
});

//database connection
const uri = `neo4j+s://${process.env.CONNECTION_URL}`;
const user = process.env.DATABASE_USER;
const password = process.env.PASSWORD;

await initDriver(uri, user, password);

export default app;
