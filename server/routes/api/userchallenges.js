const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const { Userchallenge, Challenge, Image } = require('../../db');
const { createFiles, createImage } = require('../../puppeteer-utils');
const { compareImages } = require('../../compare-images');

/**     /api/userchallenges     **/

// TODO what happens if there is more than one answer ?

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
  console.log(req.body);
  try {
    const { isSubmit, userAnswer, createDiff } = req.body;
    Userchallenge.findByPk(userchallengeId)
      .then(userchall => userchall.update(userAnswer))
      .then(async userchall => {
        console.log('challengeId: ', userchall.challengeId);
        const image = Challenge.findOne({ where: { id: userAnswer.challengeId } });

        console.log(
          'Axios: ',
          userAnswer.html,
          userAnswer.css,
          userchall.userId,
          userchall.challengeId,
          image.width,
          image.height,
        );

        const data = await createImage(
          userAnswer.html,
          userAnswer.css,
          userchall.userId,
          userchall.challengeId,
          100,
          100,
          //image.width,
          //image.height
        );

        console.log(JSON.stringify(data));
        await Image.create({ userchallengeId: userchall.id, data: JSON.stringify(data) });
        console.log('data from image: ', await Image.findOne({ where: { data } }));

        if (createDiff) {
          const challengeImg = await Image.findOne({
            where: { challengeId: userchall.challengeId },
          });
          const percentMatch = await compareImages(pathToUserImage, challengeImg, userchall.userId);
          await userchall.update({ grade: percentMatch });
        }

        const userChallenge = await Userchallenge.findByPk(userchallengeId, { include: [Image] });
        const userchallengeObject = userChallenge.get();
        if (createDiff) {
          userchallengeObject.diffImage = fs.readFileSync(
            `${path.join(process.cwd(), `server/tmp/${userChallenge.userId}.diff.png`)}`,
          );
        }
        console.log(JSON.stringify(userchallengeObject.images[0].data));
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
