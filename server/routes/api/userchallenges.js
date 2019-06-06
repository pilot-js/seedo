const router = require('express').Router();

const { Userchallenge, Image } = require('../../db');
const { createFiles, createImage } = require('../../puppeteer-utils');
const { compareImages } = require('../../compare-images');

/**     /api/userchallenges     **/

// TODO what happens if there is more than one answer ?

// get user answer for a challenge
router.get('/users/:userId/challenges/:challengeId', (req, res, next) => {
  Userchallenge.getActiveAnswer(req.params.userId, req.params.challengeId)
    .then(userchall => res.send(userchall))
    .catch(next);
});

// TODO need to check if there is an answer first ?
// bigger question - how to handle multiple answers - Github Issue #31

// create answer for a challenge
router.put('/:userchallengeId', (req, res, next) => {
  const { userchallengeId } = req.params;
  try {
    const { html, css, js, submitted } = req.body.userAnswer;
    const { isSubmit } = req.body;
    Userchallenge.findByPk(userchallengeId)
      .then(userchall => userchall.update(req.body.userAnswer))
      .then(async userchall => {
        await createFiles(userchall.html, userchall.css, userchall.userId);
        const retPath = await createImage(userchall.userId);
        const userchallengePath = retPath.replace('file://', '').replace('.html', '.png');

        if (isSubmit) {
          const challengeImg = await Image.findOne({
            where: { challengeId: userchall.challengeId },
          });

          const percentMatch = await compareImages(userchallengePath, challengeImg);

          const updatedUserchall = await userchall.update({
            grade: percentMatch,
          });

          res.send(updatedUserchall);
        }
      })
      .catch(next);
  } catch {
    res.sendStatus(404);
  }
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
