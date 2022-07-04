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

// Requisito q
app.get('/talker', async (req, res) => {
  const talker = await fs.read.read();

  return res.status(200).send(talker);
});

app.listen(PORT, () => {
  console.log('Online na http://localhost:3000');
});
