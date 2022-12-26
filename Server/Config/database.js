import neo4j from "neo4j-driver";
import * as dotenv from "dotenv";
dotenv.config();

let driver;
export async function initDriver(uri, username, password) {
  driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
  try {
    await driver.verifyConnectivity();
    console.log("Connection established");
  } catch (e) {
    console.log(e);
    console.log("Could not connect to the database");
  }
  return driver;
}

export function getDriver() {
  return driver;
}
