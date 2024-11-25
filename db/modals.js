const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
    }]
});

const courseSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    }
})

const Users = mongoose.model("Users",userSchema);
const Courses = mongoose.model("Courses",courseSchema);

module.exports={
    Users,
    Courses
}
