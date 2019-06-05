const router = require('express').Router();
const { Challenge, Image } = require('../../db');

/**  /api/challenges **/

// get all challenges
router.get('/', (req, res, next) => {
  Challenge.findAll({ include: [Image] })
    .then(challenges => res.send(challenges))
    .catch(next);
});

// create a single challenge
router.post('/', (req, res, next) => {
  const { name, description, difficulty } = req.body;
  Challenge.create({
    name,
    description,
    difficulty,
  })
    .then(challenge => res.send(challenge))
    .catch(next);
});

// get a single challenge
router.get('/:id', (req, res, next) => {
  // TODO how to handle req.params.id === NaN ?
  // if (typeof req.params.id === NaN) {
  //   const err = new Error('Not a number.  Challenge Id must be a number.');
  //   next(err);
  // }
  Challenge.findAll({ where: { id: Number(req.params.id) }, include: [Image] })
    .then(challenge => res.send(challenge[0]))
    .catch(next);
});

// update a single challenge
router.put('/:id', (req, res, next) => {
  // TODO how to handle req.params.id === NaN ?
  Challenge.findByPk(Number(req.params.id))
    .then(challenge => challenge.update(req.body))
    .then(updatedChallenge => res.send(updatedChallenge))
    .catch(next);
});

// delete a single challenge
router.delete('/:id', (req, res, next) => {
  // TODO how to handle req.params.id === NaN ?
  Challenge.findByPk(Number(req.params.id))
    .then(challenge => challenge.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
