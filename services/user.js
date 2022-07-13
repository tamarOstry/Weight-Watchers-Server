const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;

const getData = async () => fs.readFile('./users.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./users.json', JSON.stringify(data));

module.exports.getAll = async () => {
    const dataFromJson = await getData();
    return dataFromJson.users;
}

module.exports.getById = async (userId) => {
    const data = await getData();
    const users = data.users || [];
    const user = users.find(user => user.id == userId);
    return user;
}

module.exports.update = async (userId, userFromBody) => {
    const data = await getData();
    const users = data.users || [];
    const user = users.find(user => {
        if (user.id == userId) {
            user.password = userFromBody.password;
            user.firstName = userFromBody.firstName,
                user.lastName = userFromBody.lastName,
                user.address.city = userFromBody.city,
                user.address.street = userFromBody.street,
                user.address.number = userFromBody.number,
                user.phone = userFromBody.phone,
                user.email = userFromBody.email,
                user.hight = userFromBody.hight,
                user.weight.meeting[user.weight.meeting.length - 1].Weight = userFromBody.weight,
                user.eatingDiary = userFromBody.eatingDiary
        }
    });
    const allDataToJson = { 'users': users, 'manager': data.manager };
    await updateData(allDataToJson);
    console.log(allDataToJson)
}

exports.add = async (user) => {
    const id = uuidv4();
    user.id = id;
    const data = await getData() || [];
    const users = data.users;
    users.push(user);
    const allDataToJson = { 'users': users, 'manager': data.manager };
    await updateData(allDataToJson);
    return "success";
}

module.exports.delete = async (userId) => {
    const data = await getData() || [];
    const users = data.users;
    const newUsers = users.filter(user => user.id != userId);
    const allDataToJson = { 'users': newUsers, 'manager': data.manager };
    await updateData(allDataToJson);
}


const byWeightFunc = (arr, min, max) => {
    const ans = arr.filter(f => (f.weight.start > min) && (f.weight.start < max));
    console.log(ans);
    return ans;
}
const byProcessFunc = (arr) => {
    console.log('byProcessFunc');
    const ans = arr.filter(f => f.weight.start > (f.weight.meetings[f.weight.meetings.length - 1].weight));
    console.log(ans);
    return ans;
}
const byBMIFunc = (arr, bmiMin, bmiMax) => {
    const ans = arr.filter(f => (f.weight.start / (f.height * f.height) > bmiMin) &&
        (f.weight.start / (f.height * f.height) < bmiMax));
    return ans;
}
const byCityFunc = (arr, city) => {
    const ans = arr.filter(f => f.address.city === city);
    return ans;
}
const searchFunc = (arr, inputToSearch) => {
    console.log(inputToSearch);
    const ans = arr.filter(user => user.id === inputToSearch ||
        user.firstName === inputToSearch || user.lastName === inputToSearch ||
        user.address.city === inputToSearch || user.address.street === inputToSearch ||
        user.phone === inputToSearch ||
        user.email === inputToSearch || user.height === inputToSearch);
    console.log(ans);
    return ans;
}

const cutToSearch = (query) => {
    let search = ['', { minWeight: -1, maxWeight: -1 }, { minBmi: -1, maxBmi: -1 }, ''];
    let searchName = '';
    let valuesForSearch = query.split('&');
    for (let i = 0; i < valuesForSearch.length; i++) {
        let index = valuesForSearch[i].indexOf('=');
        searchName = valuesForSearch[i].substring(0, index);
        valuesForSearch[i] = valuesForSearch[i].substring(index + 1, valuesForSearch[i].length);
        switch (searchName) {
            case 'freeSearch': search[0] = valuesForSearch[i];
                break;
            case 'minWeight': search[1].minWeight = valuesForSearch[i];
                break;
            case 'maxWeight': search[1].maxWeight = valuesForSearch[i];
                break;
            case 'minBmi': search[2].minBmi = valuesForSearch[i];
                break;
            case 'maxBmi': search[2].maxBmi = valuesForSearch[i];
                break;
            case 'city': search[3] = valuesForSearch[i];
                break;
        }
        searchName = '';
    }
    console.log(search);
    return search;
}
const getBySearch = async (searches) => {
    // let searchArr = cutToSearch(query);
    console.log(searches);
    const data = await getData();
    const users = data.users;
    let currentUsers = users;
    let boolSearch = [false, false, false, false];
    if (searches[0] != '')
        boolSearch[0] = true;
    if (searches[1] != '')
        boolSearch[1] = true;
    if (searches[3] != '')
        boolSearch[2] = true;
    if (searches[5] != '')
        boolSearch[3] = true;
    for (let i = 0; i < boolSearch.length; i++) {
        if (boolSearch[i]) {
            switch (i) {
                case 0: if (searches[0] != '') {
                    currentUsers = searchFunc(currentUsers, searches[0]);
                }
                    break;
                case 1: if (searches[1] != '' && searches[2] != '') {
                    currentUsers = byWeightFunc(currentUsers, parseInt(searches[1]), parseInt(searches[2]));
                }
                    break;
                case 2: if (searches[3] != '' && searches[4] != '') {
                    currentUsers = byBMIFunc(currentUsers, parseInt(searches[3]), parseInt(searches[4]));
                }
                    break;
                case 3: if (searches[5] != '') {
                    currentUsers = byCityFunc(currentUsers, searches[5]);
                }
                    break;
            }
        }
    }
    return currentUsers;
}