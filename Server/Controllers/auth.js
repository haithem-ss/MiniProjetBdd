import passport from "passport";
// import _ from "lodash";
import { getDriver } from "../Config/database.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/users/auth/google/callback",
      passReqToCallback: true,
      scope: ["profile"],
    },
    function (request, accessToken, refreshToken, profile, done) {
      let driver = getDriver();
      let session = driver.session();
      // console.log(profile.email);
      session
        .run(`MATCH (user:User {email:"${profile.email}"}) RETURN user;`, {
          email: profile.email,
        })
        .then((results) => {
          // console.log(results.records);
          if (!_.isEmpty(results.records)) {
            return done(null, results.records[0].get("user"));
          } else {
            session
              .run(
                `CREATE (user:User {email: "${profile.email}" , firstName: "${
                  profile.family_name
                }" , lastName:" ${profile.given_name}" ,user_id: "${
                  profile.sub
                }", sex: "${null}", phoneNumber: "${null}" }) RETURN user`,
                {
                  email: profile.email,
                  firstName: profile.family_name,
                  lastName: profile.given_name,
                  user_id: profile.sub,
                  sex: null,
                  phoneNumber: null,
                }
              )
              .then((results) => {
                // console.log(results.records[0].get("user"));
                return done(null, results.records[0].get("user"));
              });
          }
        });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
