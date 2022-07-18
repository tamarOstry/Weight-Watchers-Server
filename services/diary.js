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
    const dataFromJson = await getData();
    dataFromJson.users.forEach(user => {
        if (user.id == userId) {
            // let eatingDiary = user.eatingDiary;
            user.eatingDiary.forEach(eatDiary => {
                if (eatDiary.date == dayId) {
                    Object.assign(eatDiary, newDiary);
                }
            });
        }
    })
    await updateData(dataFromJson);
    return (dataFromJson)
}

module.exports.deleteDaySummary = async (userId, dayId) => {
    const dataFromJson = await getData();
    const newDataFromJson = dataFromJson.users.find(user => user.id == userId)
    const newDiary = newDataFromJson.eatingDiary.filter(Diary => Diary.date != dayId);
    newDataFromJson.eatingDiary = newDiary;
    await updateData(dataFromJson);
    return 'delete from data'
}