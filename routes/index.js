import express from "express";
import {home} from "./../controllers/homeController.js"
import {formCrearCuenta} from "./../controllers/userController.js"

const router = express.Router()

router.get('/', home)

router.get('/create-account', formCrearCuenta)

export default router