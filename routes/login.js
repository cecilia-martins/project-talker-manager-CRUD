const express = require('express');

const routerLogin = express.Router();
const randomstring = require('randomstring');

const { validationEmail, validationPassdword } = require('../middlewares/loginValidations');

routerLogin.post('/', validationEmail, validationPassdword, (req, res) => {
  const tokenttt = randomstring.generate(16);
  return res.status(200).json({ token: tokenttt });
});

module.exports = routerLogin;
