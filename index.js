import express from "express";
import dotenv from "dotenv"; // Environment Variables
import * as path from "path"; // path.resolve, path.join
import { fileURLToPath } from "url"; // __dirname
import expressEjsLayouts from "express-ejs-layouts"; // Template Engine Layout
import flash from "connect-flash"; // Alerts with flash
import session from "express-session"; // To work with flash
import cookieParser from "cookie-parser"; // To work with flash

import router from "./routes/index.js"
import db from "./config/db.js"
import Users from "./models/Users.js";

// Main application
const app = express();

// Conection with the database
( async () => {
    try {
        await db.authenticate();
        await db.sync() // Create tables if no existe 
        console.log('*****Successfully conected to the Data Base')
    } catch(error) {
        console.log(error)
    }
})()

// Environment Variables
dotenv.config({path: '.env'})

// Read POST forms
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
//// deprecated app.use(bodyParser.json())
//// deprecated app.use(bodyParser.urlencoded({extend : true}))

// Use EJS as template engine
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')

// Views(UI files) ubication
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set('views', path.resolve(__dirname, './views')) // A:\Github\Nodejs Codigo con Juan\Meeti_Nodejs\views

// Static Files
app.use(express.static('public'))

// Use cookie parser
app.use(cookieParser())

// Create the user session
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
}))

// Flash messages
app.use(flash())

// Middleware 
app.use((req, res, next) => {

    // Flash Messages
    res.locals.flashMsg = req.flash()

    // Get the actual year and save in res.locals
    const date = new Date();
    res.locals.year = date.getFullYear();

    next()
})

// Routing
app.use('/', router)

app.listen(process.env.PORT, (error) => {
    if(error) { 
        console.log(error)
    }else {
        console.log(`***** The server is running in the port ${process.env.PORT}`)
    }
})