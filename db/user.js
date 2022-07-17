const userModel = require('../models/user');
const { ObjectId } = require('mongodb');

module.exports.getAll = async () => {
    const users = await userModel.find();
    return users;
}

module.exports.getById = async (userId) => {
    const user = await userModel.findOne(ObjectId(userId));
    return user;
}

module.exports.update = async (userId, userFromBody) => {
    const {password,firstName,lastName,address,phone,email,hight,weight,eatingDiary} = userFromBody;
    const data={
        password:password,
        firstName:firstName,
        lastName:lastName,
        address:address,
        phone:phone,
        email:email,
        hight:hight,
        weight:weight,
        eatingDiary:eatingDiary 
    }
    const updateUser = await userModel.findByIdAndUpdate(userId,data,{new:true});   
    return updateUser;
}

exports.add = async (user) => {
    const newUser = new userModel(user);
    const inserted = await newUser.save();
    return inserted;
}

module.exports.delete = async (userId) => {
    const id = ObjectId(userId);
    const userToDelete = await userModel.deleteOne(id);
    return`removed`;
}
