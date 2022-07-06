const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (name === '' || typeof name === 'undefined' || name === null) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
   return next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!talk) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório' });
  }
  if (typeof talk.watchedAt === 'undefined' || talk.watchedAt === null) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!regexDate.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

const rateValidation = (req, res, next) => {
  const { talk } = req.body;
  if (typeof talk.rate === 'undefined' || talk.rate === null) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (talk.rate <= 0 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

module.exports = {
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
};
