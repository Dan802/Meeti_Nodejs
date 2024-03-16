import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator"; // To validate forms info
import Users from "../models/Users.js";
import { sendEmail } from "../handlers/emails.js";
import { UniqueConstraintError } from "sequelize";

/** userController.js */
export function formCreateAccount (req, res){
    res.render('create-account', {
        page: 'Create Your Account'
    })
}

/** userController.js */
export async function createNewAccount(req, res) {

    const {email, userName, password, repeat} = req.body;

    const rules = [
        // The commented rules are verified by the model

        // Sanitize the data
        body('email').escape(),
        body('userName').escape(),
        body('password').escape(),
        body('repeat').escape(),

        // verify the inputs are not empty
        body('email').notEmpty().withMessage('The email is required'),
        body('userName').notEmpty().withMessage('The name is required'),
        body('password').notEmpty().withMessage('Both passwords are required'),

        body('email').isEmail().withMessage('Enter a valid email'),
        body('email').normalizeEmail(),
        body('repeat').equals(req.body.password).withMessage('The passwords are not the same')
    ];

    // Add/save the errors to req
    await Promise.all(rules.map(validation => validation.run(req)));

    // Read the express validator error
    const errorsExpress = validationResult(req);

    // We verify we have no errors with express validator
    if(!errorsExpress.isEmpty()) {
        req.flash('error', errorsExpress.errors.map(err => err.msg))
        return res.redirect('/create-account')
    }

    try {
        // Save the user in the data base
        const save = await Users.create({
            email,
            userName,
            password, 
            repeat
        })

        // url confirmation
        const url = `http://${req.headers.host}/confirm-account/${email}`

        // send email confirmation
        if(save) {
            await sendEmail({
                user : {email, userName},
                url, 
                subject: "Confirm your meeti's account",
                file: 'confirm-account'
            })
    
            req.flash('exito', 'We have sent you an email to confirm your account')
        }
        
        res.redirect('/login')

    } catch (error) {

        // We check the errors that sequelize threw (defined in the model User.js)
        
        let errorsSequelize = error.errors.map(err => err.message)

        if(error.parent.code == 23505) {
            errorsSequelize = [...errorsSequelize, 'The user already exists']
        }

        req.flash('error', errorsSequelize)
        res.redirect('/create-account')
    }
}

/** userController.js */
export async function confirmAccount(req, res, next) {
    // Verify that the user exists
    const user = await Users.findOne({ where: {email: req.params.mail}})

    if(!user) {
        req.flash('error', 'The account you are trying to verify does not exist or it is already verified')
        res.redirect('/create-account')
        return next()
    }

    // if exists, activate the account
    user.active = 1
    await user.save()
    req.flash('exito', 'The account has been confirmed, now you can login')
    res.redirect('/login')

}

/** userController.js */
export function formLogin(req, res) {
    res.render('login', {
        page: 'Log In'
    })
}



