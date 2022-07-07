const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;

const getData = async () => fs.readFile('./users.json').then(data => JSON.parse(data));
const updateData =async (data) => fs.writeFile('./users.json', JSON.stringify(data));

module.exports.getAll=async()=>{
    const dataFromJson = await getData(); 
    return dataFromJson.users;
}

module.exports.getBySearch=async()=>{

}

module.exports.getById=async (userId)=>{
    const data = await getData() ;
    const users=data.users|| [];
    const user=users.find(user => user.id==userId);
    return user;
}

module.exports.update= async(userId,userFromBody)=>{
    const data = await getData() ;
    const users=data.users|| [];
    const user=users.find(user =>{
        if(user.id==userId)
        {
            user.password=userFromBody.password;
            user.firstName=userFromBody.firstName,
            user.lastName=userFromBody.lastName,
            user.address=userFromBody.address,
            user.phone=userFromBody.phone,
            user.email=userFromBody.email,
            user.hight=userFromBody.hight,
            user.weight=userFromBody.weight,
            user.eatingDiary=userFromBody.eatingDiary
        }
    });
    const allDataToJson={'users':users,'manager':data.manager};
    await updateData(allDataToJson);
    console.log(allDataToJson)
}

exports.add=async(user)=>{
    const id = uuidv4();
    user.id = id;
    const data = await getData() || [];
    const users=data.users;
    users.push(user);
    const allDataToJson={'users':users,'manager':data.manager};
    await updateData(allDataToJson);
    return "success";
}

module.exports.delete=async(userId)=>{
    const data = await getData() || [];
    const users=data.users;
    const newUsers=users.filter(user=>user.id!=userId);
    const allDataToJson={'users':newUsers,'manager':data.manager};
    await updateData(allDataToJson);
}