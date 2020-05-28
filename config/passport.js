const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
const User = mongoose.model("users");
//const User = require("../model/User"); (Upper 2 liine and this line both are same but we are not using schema thats why don't use this line)

const key = require("./keys");
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return err;
        });
    })
  );
};
