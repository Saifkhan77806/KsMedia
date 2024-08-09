const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

})

userSchema.methods.generateAuthToken = async function(){
    try{
let token = jwt.sign({_id:this._id.toString(),name: this.name, email: this.email}, process.env.SECRET_KEY,
{
    expiresIn: "30d",
});
 
this.tokens = this.tokens.concat({token})
await this.save();
return token;
    }catch(err){
        console.log(err)
    }
}


const User = mongoose.model("User", userSchema);

module.exports = User;


//    comments:[
//         {
//             userid:{
//             type: String,
//             required:true
//             },
//             comment:{
//                 type:String,
//                 required:true
//             }
//         }
//     ],