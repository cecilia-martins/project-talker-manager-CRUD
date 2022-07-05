const express = require('express');
const bodyParser = require('body-parser');
const { randomUUID } = require('crypto');
const { read } = require('./helpers');
// const { write } = require('./helpers/fs/write');

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
  // const talkerParse = JSON.parse(talker);
  const talkerId = talker.find((el) => el.id === Number(id));
  // console.log(talkerId);
  if (!talkerId) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada' });
   }
   return res.status(200).json(talkerId);
});

// requisito 3
app.post('/login', async (req, res) => {
  const tokenttt = randomUUID().split('-').join('').substring(0, 16);

  return res.status(200).json({ token: tokenttt });
});

app.listen(PORT, () => {
  console.log('Online na http://localhost:3000');
});
