const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const authMiddleware = async (req,res,next) =>{

const token = req.header('Authorization')

if(!token){
    res.status(401).json({msg: "unauthroized http token"})
}

try{
    const isVerifeid = jwt.verify(token, process.env.SECRET_KEY)

    console.log(isVerifeid)
    const userData = await User.findOne({email: isVerifeid.email}).select({password:0,cpassword:0})
    console.log(userData)
    req.user = userData
    req.token = token
    next()

}catch(err){
    console.log(err)
}

}

module.exports = authMiddleware