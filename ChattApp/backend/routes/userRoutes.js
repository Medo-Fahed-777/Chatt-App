import express from 'express'
import protectRoute from '../middlewares/protectRoute.js'
import { getAllClients, getAllDoctors, getContacts } from '../controllers/userController.js'

const router = express.Router()

router.get('/clients' , protectRoute , getAllClients)
router.get('/doctors',protectRoute ,getAllDoctors )
router.get('/contacts',protectRoute,getContacts)

export default router