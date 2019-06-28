const router = require('express').Router();

const { Userchallenge, Challenge, Solution, Image } = require('../../db');
const { createImage } = require('../../puppeteer-utils');
const { compareImages } = require('../../compare-images');

/**     /api/userchallenges     **/

//get all userchallenges for statistic analysis
router.get('/', (req, res, next) => {
  Userchallenge.findAll()
    .then(userChallenges => res.send(userChallenges))
    .catch(next);
});

// get user answer for a challenge
router.get('/users/:userId/challenges/:challengeId', (req, res, next) => {
  Userchallenge.getActiveAnswer(req.params.userId, req.params.challengeId)
    .then(userchall => res.send(userchall))
    .catch(next);
});

router.get('/:userchallengeId', (req, res, next) => {
  const { userchallengeId } = req.params;
  Userchallenge.findByPk(userchallengeId, {
    include: [Image],
  })
    .then(userchallenge => {
      res.send(userchallenge);
    })
    .catch(next);
});

// create answer for a challenge
router.put('/:userchallengeId', (req, res, next) => {
  const { userchallengeId } = req.params;
  try {
    const { userAnswer, createDiff } = req.body;
    Userchallenge.findByPk(userchallengeId)
      .then(userchall => userchall.update(userAnswer))
      .then(async userchall => {
        const image = await Image.findOne({ where: { challengeId: userAnswer.challengeId } });

        const data = await createImage(
          userAnswer.html,
          userAnswer.css,
          userchall.userId,
          userchall.challengeId,
          image.width,
          image.height,
        );

        const userchallengeImage = await Image.findOne({
          where: { userchallengeId: userchall.id },
        });

        if (userchallengeImage) {
          await userchallengeImage.update({ data });
        } else {
          await Image.create({ userchallengeId: userchall.id, data });
        }

        const userchallenge = await Userchallenge.findByPk(userchallengeId, { include: [Image] });
        const userchallengeObject = userchallenge.get();
        if (createDiff) {
          // need the html, css and ids for userchallenge and challenge
          const challenge = await Challenge.findByPk(userchall.challengeId, {
            include: [Solution],
          });
          const { percentMatch, src } = await compareImages(
            userchallenge,
            challenge,
            image.width,
            image.height,
            userchall.userId,
          );
          await userchall.update({ grade: percentMatch });
          userchallengeObject.grade = percentMatch;
          userchallengeObject.diffImage = src;
        }
        res.send(userchallengeObject);
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
