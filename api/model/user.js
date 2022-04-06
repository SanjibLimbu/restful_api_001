const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName:String,
    password:String,
    phone:Number,
    email:String,
    userType:String

})

const user = mongoose.model('user', userSchema)
module.exports = user