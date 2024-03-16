import passport from "passport";
import localStrategy from "passport-local"
import Users from "../models/Users.js";

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    async( email, password, next) => {

        // This code runs when fill up the form
        const user = await Users.findOne({where : { email , active: 1}})

        // Check either exist 
        if(!user) return next(null, false, {
            message: 'That user does not exist or is not verified'
        })

        // The user exist, check passwords
        const verifypass = user.validatePassword(password)

        // If the password is incorrect
        if(!verifypass) return next(null, false, {
            message: 'Password incorrect'
        })

        // Everything alright
        return next(null, user)

    }
))

// passport functions
passport.serializeUser(function(user, cb) {
    cb(null, user)
})

passport.deserializeUser(function(user, cb) {
    cb(null, user)
})

export default passport
