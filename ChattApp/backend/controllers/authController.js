import generateTokenAndSetCookie from "../utils/generateToken.js"
import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'

// Register Function // ------------------------------------------------------
export const register = async (req,res) => {
  try {
    const  { 
      firstName,
      lastName,
      email,
      password,
      phone,
      confirmPassword,
    } = req.body
    // console.log(req.body.firstName,'fullName');
    if(password !== confirmPassword){
      return res.status(400).json({error:`Password don't match!`})
    }
    const user = await User.findOne({email})
    if(user){
      return res.status(400).json({error:'User Already Exist'})
    }
    const hashPassword = await bcrypt.hash(password,12)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${firstName} ${lastName}`
    
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password:hashPassword,
      profilePic:boyProfilePic
    })
    if(newUser){
      generateTokenAndSetCookie(newUser._id , res)
    }
    await newUser.save()
    // console.log("newUser",newUser.firstName);
    res.status(201).json(newUser)
  } catch (error) {
    console.log('Error In Register',error.message);
    res.status(500).json({error:'Internal Server Error!'})
  }
}

// Login Function // ---------------------------------------------

export const login = async (req , res) => {
  try {
    const { email , password } = req.body
    const user = await User.findOne({email})
    const isPasswordCorrect = await bcrypt.compare( password , user?.password || "" )
    if(!user || !isPasswordCorrect){
      return res.status(400).json({error: 'Incorrect Coordinates!'})
    }
    const token =   generateTokenAndSetCookie(user._id ,  res)
    res.status(200).json({ 
      _id:user._id,
      firstName:user.firstName,
      lastName:user.lastName,
      profilePic:user.profilePic,
      email:user.email,
      token
    })
  } catch (error) {
    console.log('Error In Login',error.message);
    res.status(500).json({error:'Internal Server Error!'})
  }
}

// Logout function // -------------------------------------

export const logout = async (req , res) => {
  try {
    res.cookie('jwt',"",{maxAge:0})
    res.status(200).json({msg:'Logged Out Successfully!'})
  } catch (error) {
    console.log('Error in Logout Controller!', error.message);
    res.status(500).json({error:'Internal Server Error!'})
  }
}
