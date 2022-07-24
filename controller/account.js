const accountService = require('../services/account.js')

exports.getByEmailPassword = async function (req, res, next) {
  try {
    const { email } =req.
    body ;
    const { password } =req.body ;
    const user = await accountService.getByEmailPassword(email, password);
    res.send(user);
  }
  catch (err) {
    next(err)
  };
}