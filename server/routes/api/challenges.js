const router = require('express').Router();
const { Challenge, Image, Comment, Solution } = require('../../db');

/**  /api/challenges **/

// get all challenges
router.get('/', (req, res, next) => {
  Challenge.findAll({ include: [Image], order: ['id'] })
    .then(challenges => {
      res.send(challenges);
    })
    .catch(next);
});

// create a single challenge
router.post('/', (req, res, next) => {
  const { name, description, difficulty, html, css } = req.body;
  Challenge.create({
    name,
    description,
    difficulty,
  })
    .then(async chall => {
      const solution = await Solution.create({
        html,
        css,
        challengeId: chall.id,
      });
      return [chall, solution];
    })
    .then(([chall, solution]) => {
      const { name, description, difficulty } = chall;
      const { html, css, challengeId } = solution;
      const challenge = {
        name,
        description,
        difficulty,
        html,
        css,
        challengeId,
      };
      res.send(challenge);
    })
    .catch(next);
});

// get a single challenge with images and comments
router.get('/:id', (req, res, next) => {
  Challenge.findByPk(req.params.id, {
    include: [Image, Comment, Solution],
  })
    .then(challenge => {
      res.send(challenge);
    })
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
