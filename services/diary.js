const fs = require('fs/promises');

const getData = async () => fs.readFile('./users.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./users.json', JSON.stringify(data));

module.exports.getDiary = async (userId) => {
    debugger
    const data = await getData();
    const user = data.users.find(user => user.id == userId);
    return user.eatingDiary;
}

module.exports.addDaySummary = async (userId, newDiary) => {
    const dataFromJson = await getData();
    dataFromJson.users.forEach(user => {
        if (user.id == userId) {
            user.eatingDiary.push(newDiary)
        }
    });
    await updateData(dataFromJson);
    return "sucssses🤯🤯🤯";
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
return "delete from data"
}