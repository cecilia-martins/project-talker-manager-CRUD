const routerTalker = require('express').Router();

const { tokenValidation } = require('../middlewares/tokenValidation');
const { read, write } = require('../helpers');

const { nameValidation,
  ageValidation, talkValidation, rateValidation } = require('../middlewares/talkerValidations');

// Requisito 1
routerTalker.get('/', async (req, res) => {
  const talker = await read();
  return res.status(200).send(talker);
});

// requisito 8
routerTalker.get('/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const talker = await read();
  if (!q) {
    return res.status(200).json(talker);
  }
  const searchTalkers = talker.filter((el) => el.name.includes(q));
  res.status(200).json(searchTalkers);
});

// requisito 2
routerTalker.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await read();
  const talkerId = talker.find((el) => el.id === Number(id));
  if (!talkerId) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada' });
   }
   return res.status(200).json(talkerId);
});

// requisito 5
routerTalker.post('/', tokenValidation, nameValidation, ageValidation,
  talkValidation, rateValidation, async (req, res) => {
  const talker = await read();
  const { name, age, talk } = req.body;
  const addTalker = { name, age, id: talker.length + 1, talk };
  const ttt = [...talker, addTalker];
  await write(ttt);
  return res.status(201).json(addTalker);
});

// requisito 6
routerTalker.put('/:id', tokenValidation, nameValidation,
ageValidation, talkValidation, rateValidation, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talker = await read();
  const addTalker = {
    name, age, talk };
  const idTalker = talker.find((eleTalker) => eleTalker.id === Number(id));
  if (!idTalker) {
    return res.status(400).send({ message: 'Pessoa palestrante não encontrada' });
  }
  Object.assign(idTalker, addTalker);
  await write(talker);
  return res.status(200).json(idTalker);
});

// requisito 7
routerTalker.delete('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const talker = await read();
  const delTalker = talker.find((eleTalker) => eleTalker.id === Number(id));
  await write(delTalker);
  return res.status(204).end();
});

module.exports = routerTalker;
