import express from 'express'
import protectRoute from '../middlewares/protectRoute.js'
import { getAllUsers} from '../controllers/userController.js'

const router = express.Router()

router.get('/' , protectRoute , getAllUsers)



export default router