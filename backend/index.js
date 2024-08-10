const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const multer = require("multer")
const path = require("path")
const authMiddleware = require("./middleware/authMiddlware.js")
const Blog = require("./models/blogModel")
const User = require("./models/userModel")
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt")
const dotenv =require('dotenv').config(); 


const {register, login, secret, uploadBlog, getBlog, comment, blogById, like, disLike, editComment, getlikes, deleteComment, deleteBlog, sendOtp, updateBlog} = require("./controller")
require("./db")
const {sendmail, otps} = require("./mail")

const app = express()

app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())
// app.use(cors({
    // origin:"http://localhost:5173",
    // methods:["POST", "GET", "DELETE", "PUT"],
    // allowedHeaders:["Content-Type"]
// }))
app.use(cors());
let otp;
let success = false;

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/images")
    },
    filename: (req,file,cb) =>{
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

const __dirname1 = path.resolve()

// if(process.env.NODE_ENV=="production"){
//     app.use(express.static(path.join(__dirname1, "/frontend/build")));

//     app.get("*", (req,res)=>{
//         res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
//     })
// }else{
//     app.get("/", (req,res)=>{
//         res.send("API in running");
//     })
// }


app.post("/register",register)
app.post("/login", login)
app.get("/secret", secret)
app.post("/upload-blog",upload.single('images'), uploadBlog)
app.get("/get-blog", getBlog);
app.get("/blog/:id",blogById);
app.put("/update-blog/:id", updateBlog)
app.post("/comment", comment);
app.post("/likes", like);
app.put("/dislikes", disLike);
app.get("/getlikes", getlikes);
app.put("/editcomment", editComment);
app.put("/deletecomment", deleteComment);
app.delete("/blogdelete/:id", deleteBlog);

otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });


app.post("/send-otp", async(req,res)=>{
    const {email} = req.body;

    const user = await User.findOne({email});

    if(!user){
        res.status(200).send({msg:"invalid Email"});
    }else{
        otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        console.log(`otp from mail side :- ${otp}`);
        sendmail(otp, email);
        res.status(200).send({msg: user._id})
    }
    
});
app.post("/verfiy-otp", async(req,res)=>{
    const {userOtp} = req.body;
    if(userOtp==otp){
          success = true;
          console.log(success);  
       res.status(200).send({success})
    }else{
        console.log("invalid otp");
        res.status(200).send({msg: "invalid otp"});
    }
})

app.post("/update-password", async(req,res)=>{
    console.log(`is otp is success ${success}`)
    const {_id, password, cpassword} = req.body;

    if(success && password==cpassword){
        const hashPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.findByIdAndUpdate({_id}, {password: hashPassword, cpassword: hashPassword});

        res.status(200).send(updatedUser);
    }else{
        res.status(200).send({msg: "Enter password & confirm as same as ! and verify otp"});
    }
})

app.listen(process.env.PORT,()=>{
    console.log("Server in running !" + process.env.PORT);
})