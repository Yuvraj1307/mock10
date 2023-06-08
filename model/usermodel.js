const mongoose=require("mongoose")

const userSch=mongoose.Schema({
    username:String,
 email:String,
 password:String
})


const userModel=mongoose.model("user",userSch)


module.exports={
    userModel
}