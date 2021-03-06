const mongoose = require("mongoose");
const schema = mongoose.Schema;
const {isEmail}= require('validator')

const addressSchema=new schema({
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
        min: 1
    }
})

const meetSchema=new schema({
    Weight: {
        type: Number,
    },
    date: {
        type: String,
    },
    comments: {
        type: String,
    }
})



const diarySchema=new schema({
    date: {
        type: Date,
         //default:new Date(),
    },
    meals:[
        [String]
    ]
})

const userSchema = new schema({ 
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
    address: addressSchema,
    phone:{
        type: String,
        minlength: 7,
        maxlength: 10
    },
    email: {
        type: String,
        unique:true,
        validate:[isEmail,'please insert valid'],
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Please fill a valid email address']
    },
    hight: {
        type: Number,
        minlength: 2,
        maxlength:3
    },
    weight: {
        startWeight:{
        type: Number,
        minlength: 2,
        maxlength:3
       },
       meetings:[meetSchema]
    },
    eatingDiary:[diarySchema]
    },{timestamps:true})
  
module.exports=mongoose.model('users',userSchema);