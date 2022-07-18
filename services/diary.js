const fs = require('fs/promises');
const diaryDb= require('../db/diary');

const getData = async () => fs.readFile('./users.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./users.json', JSON.stringify(data));

module.exports.getDiary = async (userId) => {
    const user = await diaryDb.getDiary(userId);
    return user.eatingDiary;
}

module.exports.addDaySummary = async (userId, newDiary) => {
   const daySummary = await diaryDb.addDaySummary(userId, newDiary);
   return daySummary;
}

module.exports.updateDaySummary = async (userId, dayId, newDiary) => {
    const daySummary = await diaryDb.updateDaySummary(userId,diaryId, newDiary);
    return daySummary;

}

module.exports.deleteDaySummary = async (userId, diaryId) => {
    const daySummary = await diaryDb.deleteDaySummary(userId,diaryId);
    return 'delete from data'+daySummary ;
}