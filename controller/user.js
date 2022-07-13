const userService = require('../services/user')

exports.getAll = async function (req, res, next) {
  try {
    const users = await userService.getAll();
    res.send(users);
  }
  catch (err) {
    next(err)
  };
}

exports.getById = async function (req, res, next) {
  try {
    const userId = req.params.id;
    const user = await userService.getById(userId);
    res.send(user);
  }
  catch (err) {
    next(err)
  };
}

exports.update = async function (req, res, next) {
  try {
    const userId = req.params.id;
    const user = req.body;
    await userService.update(userId, user);
    res.send();
  }
  catch (err) {
    next(err)
  };
}

module.exports.add = async function (req, res, next) {
  try {
    const user = await userService.add(req.body);
    res.send(user);
  }
  catch (err) {
    next(err)
  };

}

exports.delete = async function (req, res, next) {
  try {
    const userId = req.params.id;
    await userService.delete(userId);
    res.send();
  }
  catch (err) {
    next(err)
  };
}

exports.getBySearch = async function (req, res, next) {
  try {
    const users = await userService.getBySearch(searches);
    res.send(users);
  }
  catch (err) {
    next(err)
  };
}