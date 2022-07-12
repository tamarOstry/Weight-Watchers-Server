const fs = require('fs/promises');

const getData = async () => fs.readFile('./users.json').then(data => JSON.parse(data));

module.exports.getByEmailPassword = async (email, password) => {
    const data = await getData();
    const users = data.users || [];
    const user = users.find(user => user.email == email && user.password == password);
    console.log(user);
    return user;
}