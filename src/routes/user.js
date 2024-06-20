import express from 'express'
import UserController from '../controller/user.js'
import Auth from '../helper/auth.js'

const router = express.Router()

router.get('/',Auth.autheticate,Auth.adminGard,UserController.getAllUsers)
router.get('/:id',UserController.getUserById)

router.post('/createUser',UserController.createUsers)
router.post('/login',UserController.login)



export default router 