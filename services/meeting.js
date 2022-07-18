const meetingDB=require('../db/meeting');

module.exports.getAll = async () => {
    const dataFromJson = await getData();
    const users = dataFromJson.users;
    let meetings = [];
    users.forEach(user => {
        meetings.push({ "user": user.id, "meeting": user.weight })
    });
    return meetings;
}

module.exports.getById = async (userId) => {
    const data = await getData();
    const meat = data.users.find(user => user.id == userId).weight;
    console.log(meat);
    return meat;
}

module.exports.update = async (userId, userFromBody) => {
    const data = await getData();
    const users = data.users || [];
    const user = users.find(user => {
        if (user.id == userId) {
            user.password = userFromBody.password;
            user.firstName = userFromBody.firstName,
                user.lastName = userFromBody.lastName,
                user.address = userFromBody.address,
                user.phone = userFromBody.phone,
                user.email = userFromBody.email,
                user.hight = userFromBody.hight,
                user.weight = userFromBody.weight,
                user.eatingDiary = userFromBody.eatingDiary
        }
    });
    const allDataToJson = { 'users': users, 'manager': data.manager };
    await updateData(allDataToJson);
}

module.exports.add = async (usersMeeting) => {
   return await meetingDB.add(usersMeeting);
}

module.exports.delete = async (userId) => {
    const data = await getData() || [];
    const users = data.users;
    const newUsers = users.filter(user => user.id != userId);
    const allDataToJson = { 'users': newUsers, 'manager': data.manager };
    await updateData(allDataToJson);
}