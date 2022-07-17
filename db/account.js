const userModel = require('../models/user');
const managerModel = require('../models/manager');

module.exports.getByEmailPassword = async (email, password) => {
    const user = await userModel.findOne({ email: email,password: password });
    if (user) {
        return user;
    }
    else {
        const manager = await managerModel.findOne({ email: email, password: password })
        return manager;
    }
}