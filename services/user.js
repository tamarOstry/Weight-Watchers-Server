const userDB=require('../db/user');

module.exports.getAll = async () => {
    const users = await userDB.getAll();
    return users;
}

module.exports.getById = async (userId) => {
    const user = await userDB.getById(userId);
    return user;
}

module.exports.update = async (userId, userFromBody) => {
    const updateUser = await userDB.update(userId, userFromBody);   
    return updateUser;
}

exports.add = async (user) => {
    await userDB.add(user);
    return "success";
}

module.exports.delete = async (userId) => {
   await userDB.delete(userId);
   return "removed";
}


byWeightFunc = async(users, min, max) => {
    const ans = await userDB.byWeightFunc(min, max);
    // const ans = users.filter(user => (user.weight.startWeight > min) && (user.weight.startWeight < max));
    return ans;
}
byProcessFunc = async(arr) => {
    console.log('byProcessFunc');
    const ans = arr.filter(f => f.weight.startWeight > (f.weight.meetings[f.weight.meetings.length - 1].weight));
    console.log(ans);
    return ans;
}
byBMIFunc = async(users, bmiMin, bmiMax) => {
    const ans = users.filter(user => (user.weight.startWeight / 
    (user.hight* user.hight) > bmiMin) &&
        (user.weight.startWeight / (user.hight* user.hight) < bmiMax));
    return ans;
}
byCityFunc = async(users, city) => {
    const ans = await userDB.searchByCity(city);
    // const ans = users.filter(user => user.address.city === city);
    return ans;
}
 searchFunc = async(users, inputToSearch) => {
    let ans = users.filter(user => user.id === inputToSearch ||
        user.firstName === inputToSearch || user.lastName === inputToSearch ||
        user.address.city === inputToSearch || user.address.street === inputToSearch ||
        user.phone === inputToSearch ||
        user.email === inputToSearch || user.height === inputToSearch);
    return ans;
}

module.exports.getBySearch = async (searches) => {
    let users = await userDB.getAll();
    for (let i = 0; i < searches.length; i++) {
        if (searches[i]!=='') {
            switch (i) {
                case 0: 
                    users = searchFunc(users, searches[0]);
                    break;
                case 1:  
                    users = byWeightFunc(users, parseInt(searches[1]), parseInt(searches[2]));
                    break;
                case 3: 
                    users = byBMIFunc(users, parseInt(searches[3]), parseInt(searches[4]));
                    break;
                case 5: 
                    users = byCityFunc(users, searches[5]);
                    break;
            }
        }
    }
    return users;
}