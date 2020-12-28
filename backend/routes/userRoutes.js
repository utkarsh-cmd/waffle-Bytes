import express from 'express'
import { getProfile, login ,getProfileByID,registerUser, updateUserProfile, getUserProfile} from '../controller/userController.js'
import { protect } from '../middleware/protect.js'

const Router = express.Router()

Router.post('/login',login)
Router.get('/',protect,getProfile)

Router.post('/register' , registerUser)
Router.put('/profile',protect,updateUserProfile)
Router.get('/profile',protect, getUserProfile)
Router.get('/:id' ,  getProfileByID)


export default Router