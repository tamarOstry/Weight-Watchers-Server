const mongoose = require("mongoose");
const schema = mongoose.Schema;
const {isEmail}= require('validator');
const user=require('./user')

const userOfUserSchema = new schema({
    userId:{   
        type: mongoose.Schema.Types.ObjectId ,
        ref:'users',
    }
 })

const managerSchema = new schema({ 
    password:{
        type: String,
        minlength: 2
    }, 
    firstName: {
        type: String,
        minlength: 2
    },
    lastName: {
        type: String,
        minlength: 2
    },
    phone:{
        type: String,
        minlength: 7,
        maxlength: 10
    },
    email: {
        type: String,
        unique:true,
        validate:[isEmail,'please insert valid']
    },
    users: [userOfUserSchema]
    },{timestamps:true})
  
module.exports=mongoose.model('managers',managerSchema);