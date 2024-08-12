const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const User = require("./models/userModel")
const Blog = require("./models/blogModel")
const nodemailer = require("nodemailer");

const register = async (req,res) =>{
    try{
        const {name, email, password, cpassword} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        if(password === cpassword){
            const isExistingUser = await User?.findOne({name})
            if(isExistingUser){
            res.status(200).send({msg: "user is already exists 1", success: false});
            }
        const register = new User({name, email, password:hashPassword, cpassword:hashPassword})
        const token = await register.generateAuthToken()

        await register.save();
    
        console.log(req.body);
        res.status(200).send({msg:"user registered successfully",tokenCreated:token,  success: true})
    }
    else{
        res.status(200).send({msg:"please write password and comfirm password as same as", success: false})
    }
    }catch(err){
        console.log(err)
    }
}

const login = async (req,res) =>{
    try{
        const {name, password} = req.body;

        const userFind = await User.findOne({name})
        const passwordTrue = await bcrypt.compare(password,userFind.password)

        if(passwordTrue){
            const token = await userFind.generateAuthToken()
            console.log(`token parts :- ${token}`)

           
            res.status(200).send({msg:"user login successfully",tokenCreated:token, success:true})
           
        }else{
            res.status(200).send({msg:"wrong credentials", success:false})
        }

    }catch(err){
        console.log(err)
    }

}

const secret = async (req,res) =>{

    try{

        const userData = req.user;
        console.log("ter",userData?.name);
        res.status(200).send({userName: userData?.name, userEmail: userData?.email})
    }catch(err){
        console.log(`Error from the user route :- ${err}`)
    }

}

const uploadBlog = async(req,res) =>{
        console.log(req.body);
        console.log("file");
        console.log(req.file);

        const {userId, title, thought} = req.body;
        const blogs = new Blog({userId, title, thought, images: req.file?.filename})
        await blogs.save();

        res.status(200).send(blogs);
    }

const getBlog = async(req, res) =>{
    const allBlog = await Blog.find({});
    res.status(200).send(allBlog)
}

const blogById = async(req,res)=>{
   try{
const {id} = req.params;

const blog = await Blog.findById(id);

if(blog)
res.status(200).send(blog);
   }catch(err){
    console.log(err)
   }
}

const comment = async(req,res) =>{
try{
const {blogid, userid, comment} = req.body;

const blog = await Blog.findById(blogid);

if(blog){
    const commentsget = await blog.generateComment(userid, comment);

    await blog.save();

    res.status(200).send({msg: "comment added succesfully !", success: true})
    
}

}catch(err){
    console.log(err)
}
}

const like = async(req,res)=>{
    try{
        const {userid, blogid} = req.body;

        const blog = await Blog.findById(blogid);

        console.log(blog)
        if(blog){
             await blog.addLike(userid);
             await blog.save();

            return res.status(200).send({msg: "like added successfully", sucess: true})
        }
          

    }catch(err){
        console.log(err)
    }
}

const disLike = async(req,res)=>{
    const {userid, id} = req.body;

   const disLike = await Blog.findOneAndUpdate( 
    { _id: id }, 
    { $pull: { likes: {userid} } } 
  )
    console.log(disLike)

    res.status(200).send({msg: "dislikes successfully", success: true});

}

const editComment = async(req,res)=>{
    const {blogid, commentid, comment} = req.body;
 
    const editcomment = await Blog.updateOne( 
        { _id: blogid , "comments._id":  commentid}, 
        { $set : {"comments.$.comment": comment} } 
      )
        console.log(editcomment)
    
        res.status(200).send({msg : "edited successfully", success: true});
}

const getlikes = async(req,res)=>{
    try{
       const {id} = req.body;

        const blog = await Blog.findById(id);

        res.status(200).json({likes: blog.likes.length, likesid: blog.likes});
    }catch(err){
        console.log(err)
    }
}

const deleteComment = async(req,res)=>{

    const {blogid, commentid} = req.body;

    const deleteComment = await Blog.findOneAndUpdate(
        { _id: blogid }, 
        { $pull: { comments: {_id:commentid} } } 
        )

        res.status(200).send({msg: "comment deleted successfully", success: true})
}

const deleteBlog = async(req,res)=>{
    try{
        const {id} = req.params;

        await Blog.findByIdAndDelete(id);

        res.status(200).send({msg:"blog deleted successfully", sucesss: true});

    }catch(err){
        console.log(err);
    }
}

const updateBlog = async(req,res)=>{
    try{
        const {id} = req.params;

        const data = req.body;


        await Blog.findByIdAndUpdate({_id:id}, data);

        res.status(200).send({msg: "blog update successfully", success: true});

    }catch(err){
        console.log(err)
    }
}



module.exports = {register, login, secret, uploadBlog, getBlog, comment, blogById, like, disLike, editComment, getlikes, deleteComment, deleteBlog, updateBlog}