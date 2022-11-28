import express from 'express'
import cors from 'cors'
import {  initDriver } from './Config/database.js'
import * as dotenv from 'dotenv'



if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

await initDriver(uri, user, password)


export default  app;