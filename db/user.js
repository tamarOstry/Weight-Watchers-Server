const userModel = require('../models/user');
const { ObjectId } = require('mongodb');

module.exports.getAll = async () => {
    const users = await userModel.find();
    return users;
}

module.exports.getById = async (userId) => {
    const user = await userModel.findOne({_id:ObjectId(userId)});
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

module.exports.searchFunc = async (inputSearch) => {
    const users =await userModel.find({
    $or:[{firstName: /inputSearch/ ,lastName: /inputSearch/,
          password:/inputSearch/,address:/inputSearch/,phone:/inputSearch/,
          email:/inputSearch/,hight:/inputSearch/
    }]})
    return users;
}

module.exports.byWeightFunc = async (minWeight,maxWeight) => {
    const users = await userModel.find({$and:[{'weight.startWeight': { $gte: minWeight}} ,{'weight.startWeight':{$lt: maxWeight}}]});
    return users;
}

module.exports.byBMIFunc = async (city) => {
    const users = await userModel.find({ "address.city": city });
    return users;
}

module.exports.searchByCity = async (city) => {
    const users = await userModel.find({ "address.city": city });
    return users;
}

// module.exports.search = async (inputSearch,minWeight,maxWeight,city,minBmi,maxBmi) => {
//     const users =await userModel.find(
//     {$and[]
//     {$or:[{firstName: /inputSearch/ ,lastName: /inputSearch/,
//           password:/inputSearch/,address:/inputSearch/,phone:/inputSearch/,
//           email:/inputSearch/,hight:/inputSearch/
//     }]})
//     return users;
// }