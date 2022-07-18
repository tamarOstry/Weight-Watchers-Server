const userModel = require('../models/user');
const managerModel = require('../models/manager');

module.exports.getByEmailPassword = async (email_, password_) => {
    const user = await userModel.findOne({ email: email_,password: password_});
    if (user) {
        return user;
    }
    else {
        const manager = await managerModel.findOne({ email: email_ , password: password_ });
        return manager;
    }
}