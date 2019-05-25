const router = require('express').Router();
const { Challenge } = require('../../db');

/**  /api/challenges **/

// get all challenges
router.get('/', (req, res, next) => {
  Challenge.findAll()
    .then(challenges => res.send(challenges))
    .catch(next);
});

// create a single challenge
router.post('/', (req, res, next) => {
  Challenge.create(req.body)
    .then(challenge => res.send(challenge))
    .catch(next);
});

// get a single challenge
router.get('/:id', (req, res, next) => {
  Challenge.findByPk(req.params.id)
    .then(challenge => res.send(challenge))
    .catch(next);
});

// update a single challenge
router.put('/:id', (req, res, next) => {
  Challenge.findByPk(req.params.id)
    .then(challenge => challenge.update(req.body))
    .then(updatedChallenge => res.send(updatedChallenge))
    .catch(next);
});

// delete a single challenge
router.delete('/:id', (req, res, next) => {
  Challenge.findByPk(req.params.id)
    .then(challenge => challenge.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
