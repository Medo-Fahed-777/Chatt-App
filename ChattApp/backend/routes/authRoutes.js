import express from 'express'
import { login, logout, register } from '../controllers/authController.js'

const router = express.Router()

router.post('/register',register)
router.get('/register',(req,res) => {
  res.send('Register Page')
})

router.post('/login',login)
router.get('/login',(req,res)=>{
  res.send('Login Page')
})

router.post('/logout',logout)
router.get('/logout',(req , res)=>{
  res.send('Logout Page!')
})


export default router