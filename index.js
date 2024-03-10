import express from "express";
import dotenv from "dotenv"; // Environment Variables
import * as path from "path"; // path.resolve, path.join
import { fileURLToPath } from "url"; // Dirname

import router from "./routes/index.js"

const app = express();

// Environment Variables
dotenv.config({path: '.env'})

// Use EJS as template engine
app.set('view engine', 'ejs')

// Views(UI files) ubication
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set('views', path.resolve(__dirname, './views')) // A:\Github\Nodejs Codigo con Juan\Meeti_Nodejs\views

// Static Files
app.use(express.static('public'))

// Routing
app.use('/', router)

app.listen(process.env.PORT, (error) => {
    if(error) { 
        console.log(error)
    }else {
        console.log(`***** The server is running in the port ${process.env.PORT}`)
    }
})