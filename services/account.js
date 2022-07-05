
module.exports.getByEmailPassword=async (email, password)=>{
    return await data.users.find({ email: email, password: password });
 }