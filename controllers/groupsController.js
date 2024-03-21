import { body, validationResult } from "express-validator"; // To validate forms info
import multer from "multer"; // To upload images
import { fileURLToPath } from 'url'
import shortid from 'shortid'
import Categories from "./../models/Categories.js";
import Groups from "./../models/Groups.js";

const filePath = fileURLToPath(new URL('../public/uploads/groups', import.meta.url)) // root\public\uploads\perfiles

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1]

        // callback( error, nombre del archivo)
        cb(null, `${shortid.generate()}.${extension}`)
    }
})

const configMulter = { 
    storage: fileStorage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter(req, file, cb) {

        // Check mimetype
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            cb(new Error('The file must be an image (jpeg or png)'), false)
        } else {
            // All checks passed
            cb(null, true);
        }
    }
};

// single('') depends on the name assigned in the name form
const upload = multer(configMulter).single('image')

export function uploadImage(req, res, next) {
   
    upload(req, res, function(error) {
        console.log('---Desde upload at ', new Date())

        if(error) {

            // TODO: Arreglar esta monda

            if(error instanceof multer.MulterError) {
                console.log('A Multer error occurred when uploading.')
                console.log(error.message)

                if(error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'The file is too large')
                } else {
                    req.flash('error', error.message);
                }

            } else if(error.hasOwnProperty('message')) {

                console.log('An unknown error occurred when uploading.')
                console.log(error.message)
                req.flash('error', error.message);
            }

            console.log('Redirecciona a back')
            return res.redirect('back');

        } else {
            next();
        }
    })
}

export async function formNewGroup(req, res) {
    
    const categories = await Categories.findAll()

    res.render('new-group', {
        page:'Create a new group',
        categories
    })
}

// save groups in the database
export async function createGroup(req, res, next) {
    
    console.log('Desde createGroup')
    console.log(req.body)
    console.log(req.file)

    const {name, description, categoryId, url} = req.body
    let image = ''

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

    // Read the image
    if(req.file) {
        image = req.file.filename
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
