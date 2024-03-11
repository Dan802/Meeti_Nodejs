import express from "express";
import dotenv from "dotenv"; // Environment Variables
import * as path from "path"; // path.resolve, path.join
import { fileURLToPath } from "url"; // __dirname
import expressEjsLayouts from "express-ejs-layouts"; // Template Engine Layout

import router from "./routes/index.js"
import { db } from "./config/db.js"

const app = express();

// Conection with the database
db.sync().then(() => console.log('***** DB connected')).catch((error) => console.log(error))

// Environment Variables
dotenv.config({path: '.env'})

// Use EJS as template engine
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')

// Views(UI files) ubication
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set('views', path.resolve(__dirname, './views')) // A:\Github\Nodejs Codigo con Juan\Meeti_Nodejs\views

// Static Files
app.use(express.static('public'))

// Middleware (user logged in, flash messages, actual date)
app.use((req, res, next) => {
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