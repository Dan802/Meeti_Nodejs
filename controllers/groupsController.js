import { body, validationResult } from "express-validator"; // To validate forms info
import Categories from "./../models/Categories.js";
import Groups from "./../models/Groups.js";

export async function formNewGroup(req, res) {
    
    const categories = await Categories.findAll()

    res.render('new-group', {
        page:'Create a new group',
        categories
    })
}

// save groups in the database
export async function createGroup(req, res) {
    
    console.log(req.body)

    const {name, description, categoryId, image, url} = req.body

    // validate information with express-validator
    const rules = [
        // Sanitize the data
        body('name').escape(),
        body('description').escape(),
        body('categoryId').escape(),
        body('image').escape(),
        body('url').escape(),
        body('description').notEmpty().withMessage('The email is required')
    ];

    // Add/save the errors to req
    await Promise.all(rules.map(validation => validation.run(req)));

    // Read the express validator error
    const errorsExpress = validationResult(req);

    // We verify we have no errors with express validator
    if(!errorsExpress.isEmpty()) {
        req.flash('error', errorsExpress.errors.map(err => err.msg))
        return res.redirect('/new-group')
    }

    try {

        // Save the group in the data base
        const save = await Groups.create({
            name,
            description,
            url,
            image, 
            categoryId,
            userId: req.user.id
        })

        if(save) {
            req.flash('exito', 'The group have been created successfully')
        }
        return res.redirect('/admin')
        
    } catch (error) {
        console.log(error)

        // We check the errors that sequelize threw (defined in the model User.js)
        let errorsSequelize = error.errors.map(err => err.message)

        req.flash('error', errorsSequelize)
        return res.redirect('/new-group')
    }
}
