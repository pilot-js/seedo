const router = require('express').Router();

const { Userchallenge } = require('../../db');
const { createFiles, createImage } = require('../../puppeteer-utils');

/**     /api/userchallenges     **/

// TODO what happens if there is more than one answer ?

// get user answer for a challenge
router.get('/challenge/:challengeId', (req, res, next) => {
  Userchallenge.findAll({
    where: { challengeId: req.params.challengeId },
  })
    .then(userchall => res.send(userchall))
    .catch(next);
});

// TODO need to check if there is an answer first ?
// bigger question - how to handle multiple answers - Github Issue #31

// create answer for a challenge
router.post('/challenge/:challengeId', (req, res, next) => {
  const { challengeId } = req.params;
  const { html, css, js, submitted } = req.body;
  Userchallenge.create({
    where: { challengeId },
    html,
    css,
    js,
    submitted,
  })
    .then(async userchall => {
      await createFiles(userchall.html, userchall.css, 'tmp');
      await createImage('tmp');
      res.send(userchall);
    })
    .catch(next);
});

// update answer for a challenge
router.put('/:userchallengeId/challenge/:challengeId', (req, res, next) => {
  Userchallenge.findAll({
    where: {
      challengeId: req.params.challengeId,
      id: req.params.userchallengeId,
    },
  })
    .then(userchall => userchall.update(req.body))
    .then(updatedChall => res.send(updatedChall))
    .catch(next);
});

// delete answer for a challenge
router.delete('/challenge/:challengeId', (req, res, next) => {
  // TODO how to handle req.params.id === NaN ?
  Userchallenge.findByPk(Number(req.params.challengeId))
    .then(userchall => userchall.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
