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
  console.log('talkkkkkkkkkkkk');
  return next();
};

module.exports = {
  nameValidation,
  ageValidation,
  talkValidation,
};
