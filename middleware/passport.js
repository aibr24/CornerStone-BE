const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const User = require("../db/models/User");
const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({
                where: { username },
            });

            const passwordsMatch = user
                ? await bcrypt.compare(password, user.password)
                : false;
            if (passwordsMatch) {
                return done(null, user);
            }
        } catch (error) {
            done(null, false);
        }
    });

exports.jwtStrategy = new JWTStrategy({
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
}, async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
        return done(null, false);
    } else {
        try {
            const user = await User.findByPk(jwtPayload.id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    }
});