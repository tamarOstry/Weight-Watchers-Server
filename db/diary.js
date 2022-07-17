const userModel = require('../models/user');
const { ObjectId } = require('mongodb');

module.exports.getDiary = async (userId) => {
    const users = await userModel.findOne({_id : ObjectId(userId)});
    return users;
}

module.exports.addDaySummary = async (userId,newDiary) => {
}