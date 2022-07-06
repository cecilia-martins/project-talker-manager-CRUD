const express = require('express');
const bodyParser = require('body-parser');
const { randomUUID } = require('crypto');
const { read, write } = require('./helpers');
const { validationEmail, validationPassdword } = require('./middlewares/loginValidations');
const { tokenValidation } = require('./middlewares/tokenValidation');
const { nameValidation,
  ageValidation, talkValidation, rateValidation } = require('./middlewares/talkerValidations');

// console.log(fs.read);

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', async (req, res) => {
  const talker = await read();
  return res.status(200).send(talker);
});

// requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await read();
  const talkerId = talker.find((el) => el.id === Number(id));
  if (!talkerId) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada' });
   }
   return res.status(200).json(talkerId);
});

// requisito 3 e 4
app.post('/login', validationEmail, validationPassdword, (req, res) => {
  const tokenttt = randomUUID().split('-').join('').substring(0, 16);

  return res.status(200).json({ token: tokenttt });
});

// requisito 5
app.post('/talker', tokenValidation, nameValidation, ageValidation,
  talkValidation, rateValidation, async (req, res) => {
  const talker = await read();
  const { name, age, talk } = req.body;
  const addTalker = { name, age, id: talker.length + 1, talk };
  const ttt = [...talker, addTalker];
  await write(ttt);
  return res.status(201).json(addTalker);
});

// requisito 6
app.put('/talker/:id', tokenValidation, async (req, res) => {
  res.send('66666666666666666666666666666666666666');
});

app.listen(PORT, () => {
  console.log('Online na http://localhost:3000');
});
