import express from "express";
import dotenv from "dotenv"; // Environment Variables

import router from "./routes/index.js"

const app = express();

// Environment Variables
dotenv.config({path: '.env'})

// Routing
app.use('/', router)

app.listen(process.env.PORT, (error) => {
    if(error) { 
        console.log(error)
    }else {
        console.log(`***** The server is running in the port ${process.env.PORT}`)
    }
})