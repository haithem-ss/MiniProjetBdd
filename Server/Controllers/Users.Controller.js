import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDriver } from "../Config/database.js";

export const Register = async (req, res) => {
  const userInfos = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    sexe: req.body.sexe,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    confirmationPassword: req.body.confirmationPassword,
  };
  //verify if password and confirmationPassword are a match
  if (userInfos.password !== userInfos.confirmationPassword)
    return res.status(400).json({ msg: "Please verify password" });
  //init hashing function
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(userInfos.password, salt);
  //init driver
  let driver = getDriver();
  const session = driver.session();
  try {
    // create user
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
                CREATE (u:User {
                  email: "${userInfos.email}",
                  password:"${userInfos.password}",
                  firstName: "${userInfos.firstName}",
                  lastName: "${userInfos.lastName}",
                  dateOfBirth: "${userInfos.dateOfBirth}",
                  phoneNumber: "${userInfos.phoneNumber}",
                  sexe:"${userInfos.sexe}"
                })
              `
      )
    );
    res.status(200).json({ msg: "Registration was successful" });
  } catch (error) {
    //Cant create user
    //Email already used
    if (error.code === "Neo.ClientError.Schema.ConstraintValidationFailed ") {
      res.status(400).json({ code_err: "duplicatedEmail" });
      console.log("Duplicated email");
    }
}}

export const getUsers = async(req, res) => {
  let driver=getDriver()
  const session = driver.session()
    try {
      const user = await session.executeRead(
        tx => tx.run(
          `
            MATCH (u)
            return u
          `
        )
      )
      console.log(user)
      res.status(200).json(user)}
      
     catch (error) {
      console.log(error)
      res.status(404).json({msg:"no users"});
    }}



export const Login = async(req, res) => {
  let driver=getDriver()
  const session = driver.session()
    try {

      const user = await session.executeRead(
        tx => tx.run(
          `
            MATCH (u:User  {
              email: "${req.body.email}"
            })
            return u
          `
      ))
      if (!user.records) return res.status(400).json({code_msg: "EmailNotFound"});
      const userInfos={
        email:user.records[0].get("u").properties.email
      }
      console.log(userInfos)
      //compare passwords
        const match = await bcrypt.compare(req.body.password,user.records[0].get("u").properties.password);
        if(!match) return res.status(400).json({code_msg: "invalidPassword"});
          //Getting user's data

        const accessToken = jwt.sign(userInfos, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign(userInfos, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await session.executeWrite(
          tx => tx.run(
            `
              MATCH (u:User {
                email: "${userInfos.email}"
              })
              SET u.refreshToken="${refreshToken}"
              return u
            `
      )
    );


        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:"Error"});
    }
}
 
// export const Logout = async(req, res) => {
//     const refreshToken = req.cookies.refreshToken;
//     if(!refreshToken) return res.sendStatus(204);
//     const user = await Users.findAll({
//         where:{
//             refresh_token: refreshToken
//         }
//     });
//     if(!user[0]) return res.sendStatus(204);
//     const userId = user[0].id;
//     await Users.update({refresh_token: null},{
//         where:{
//             id: userId
//         }
//     });
//     res.clearCookie('refreshToken');
//     return res.sendStatus(200);
// }
