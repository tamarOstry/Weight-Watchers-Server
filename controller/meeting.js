const meetingService = require('../services/meeting')
exports.getAll = async function (req, res, next) {
  try {
    const users = await meetingService.getAll();
    res.send(users);
  }
  catch (err) {
    next(err)
  };
}

exports.getById = async function (req, res, next) {
  try {
    const userId = req.params.id;
    const user = await meetingService.getById(userId);
    res.send(user);
  }
  catch (err) {
    next(err)
  };
}

exports.update = async function (req, res, next) {
  try {
    const userId = req.params.id;
    const { password, firstName, lastName, address, phone, email, hight, weight, eatingDiary } = req.body;
    const newUser = {
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone: phone,
      email: email,
      hight: hight,
      weight: weight,
      eatingDiary: eatingDiary
    }
    const updateUser = await userService.update(newUser, userId);
    res.send(updateUser);
  }
  catch (err) {
    next(err)
  };
}

exports.add = async function (req, res, next) {
  try {
    const user = meetingService.add(req.body);
    res.send(user)
  }
  catch (err) {
    next(err)
  };
}

exports.delete = async function (req, res, next) {
  try {
    const userId = req.params.id;
    await userService.delete(userId);
    res.send('removed');
  }
  catch (err) {
    next(err)
  };
}
