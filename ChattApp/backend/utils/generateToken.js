import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

const generateTokenAndSetCookie = ( userId , role ,  res) => {
  const token = jwt.sign({userId,role} , JWT_SECRET ,{
    expiresIn:'5d'
  })
  res.cookie('jwt' , token , {
    maxAge: 5 * 24 * 60 * 60 * 1000,  // MS
    httpOnly: true,
    sameSite:'strict'
  })
  return token // Return the token in the response
}

export default generateTokenAndSetCookie