const accountDb= require('../db/account')

module.exports.getByEmailPassword = async (email, password) => {
    const  person = await accountDb.getByEmailPassword(email, password)
     return JSON.stringify(person);
}