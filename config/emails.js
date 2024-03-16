import dotenv from "dotenv";

dotenv.config({path: '.env'})

export const emailConfig = {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
}