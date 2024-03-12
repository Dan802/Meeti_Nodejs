import express from "express";
import {home} from "./../controllers/homeController.js"
import {formCreateAccount, createNewAccount, formLogin} from "./../controllers/userController.js"

const router = express.Router()

router.get('/', home)

router.get('/create-account', formCreateAccount)
router.post('/create-account', createNewAccount)

router.get('/login', formLogin)

export default router