const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    thought:{
        type:String,
        required: true
    },
    images:{
        type:String,
        required: true
    },
    date:{
                type:Date,
                default: Date.now
    },
    likes:[
        {
            userid:{
                type:String
            }
        }
    ],
    comments:[
        {
            userid:{
                type:String
            },
            date:{
                type:Date,
                default: Date.now
            },
            comment:{
                type:String,
                required: true
            }
        }
    ]
});


blogSchema.methods.generateComment = async function(userid, comment){
    try{
        this.comments = this.comments.concat({userid, comment});
        await this.save;
        return this.comments;
    }catch(err){
        console.log(err);
    }
}

blogSchema.methods.addLike = async function(userid){
    try{
        this.likes = this.likes.concat({userid})
        await this.save;
        return this.likes;
    }catch(err){
        console.log(err)
    }
}

const Blog = mongoose.model("Blog", blogSchema);



module.exports = Blog;