import express from "express";
import {home} from "./../controllers/homeController.js"
import {formCreateAccount, createNewAccount, confirmAccount, formLogin,  } from "./../controllers/userController.js"
import {authUser} from "./../controllers/authController.js"

const router = express.Router()

router.get('/', home)

router.get('/create-account', formCreateAccount)
router.post('/create-account', createNewAccount)
router.get('/confirm-account/:mail', confirmAccount)

router.get('/login', formLogin)
router.post('/login', authUser)

export default router