import express from "express";
import {home} from "./../controllers/homeController.js"
import {formCreateAccount, createNewAccount, confirmAccount, formLogin,  } from "./../controllers/userController.js"
import {authUser, userAuthenticated} from "./../controllers/authController.js"
import { panelAdmin } from "../controllers/adminController.js";
import { formNewGroup, createGroup, uploadImage} from "../controllers/groupsController.js";

const router = express.Router()

//* homeController
router.get('/', home)

//* userController
router.get('/create-account', formCreateAccount)
router.post('/create-account', createNewAccount)
router.get('/confirm-account/:mail', confirmAccount)
router.get('/login', formLogin)

//* authController
router.post('/login', authUser)

//* adminController
router.get('/admin', userAuthenticated, panelAdmin)

//* groupsController
router.get('/new-group', userAuthenticated, formNewGroup)
router.post('/new-group', uploadImage, createGroup)

export default router