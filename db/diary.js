const userModel = require('../models/user');
const { ObjectId } = require('mongodb');

module.exports.getDiary = async (userId) => {
    const users = await userModel.findOne({_id : ObjectId(userId)});
    return users;
}

module.exports.addDaySummary = async (userId,newDiary) => {
    const user = await userModel.findOne({_id : ObjectId(userId)});
    user.eatingDiary.push(newDiary);
    const newUser = await userModel.findByIdAndUpdate(userId,user,{ new: true });
    return newUser;
}

module.exports.updateDaySummary = async (userId,diaryId,newDiary) => {
    const user = await userModel.findOne({_id : ObjectId(userId)});
    user.eatingDiary.forEach(diary=>{
        if (diary.id===diaryId)
            diary=newDiary;
    });
    const newUser = await userModel.findByIdAndUpdate(userId,user,{ new: true });
    return newUser;
}

module.exports.deleteDaySummary = async (userId,diaryId) => {
    const user = await userModel.findOne({_id : ObjectId(userId)});
    user.eatingDiary.filter(diary =>diary.id !== diaryId);
    const newUser = await userModel.findByIdAndUpdate(userId,user,{ new: true });
    return newUser;
}

