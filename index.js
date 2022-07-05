const express = require('express');
const bodyParser = require('body-parser');
const fs = require('./helpers');

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
  const talker = await fs.read.read();
  return res.status(200).send(talker);
});

// requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fs.read.read();
  // const talkerParse = JSON.parse(talker);
  const talkerId = talker.find((el) => el.id === Number(id));
  // console.log(talkerId);
  if (!talkerId) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada' });
   }
   return res.status(200).json(talkerId);
});

app.listen(PORT, () => {
  console.log('Online na http://localhost:3000');
});
