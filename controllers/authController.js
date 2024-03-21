import passport from "passport";

export const authUser = passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'Missing credentials'
})

// Check out if the user is authenticated
export function userAuthenticated(req, res, next) {
    
    // isAuthenticated from passport
    if(req.isAuthenticated()) {
        return next()
    } else {
        return res.redirect('/login')
    }
}
