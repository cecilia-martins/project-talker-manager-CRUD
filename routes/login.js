const express = require('express');

const routerLogin = express.Router();
const { randomUUID } = require('crypto');
const { validationEmail, validationPassdword } = require('../middlewares/loginValidations');

routerLogin.post('/', validationEmail, validationPassdword, (req, res) => {
  const tokenttt = randomUUID().split('-').join('').substring(0, 16);

  return res.status(200).json({ token: tokenttt });
});

module.exports = routerLogin;
