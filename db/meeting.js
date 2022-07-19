const userModel = require('../models/user');
const { ObjectId } = require('mongodb');

module.exports.add = async (usersMeeting) => {
    usersMeeting.forEach(async userMeat => {
        const user = await userModel.findOne({_id:ObjectId(userMeat.userId)});
        user.weight.meetings.push(userMeat);
        await userModel.findByIdAndUpdate(userMeat.userId,user,{new:true});   
    });
    return 'add'
}