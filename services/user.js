const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;

const getData = async () => fs.readFile('./users.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./users.json', JSON.stringify(data));

module.exports.getAll=async()=>{
    debugger
    const dataFromJson = await getData(); 
    return dataFromJson.users;
}

module.exports.getBySearch=async()=>{

}

module.exports.getById=(userId)=>{

}

module.exports.update=(user)=>{
    const data=fs.writeFile('./users.json', JSON.stringify(user));
    return data;
}

module.exports.add=async(user)=>{
    const id = uuidv4();
    user.id = id;
    const data = await getData() || [];
    const users=data.users;
    users.push(user);
    await updateData(users);
    return user;
}

module.exports.delete=(userId)=>{
    //call the json page
}