const router = require('express').Router();
const fs = require('fs');
const { Challenge, Image, Comment, Solution } = require('../../db');
const { createFiles, createImagePreview } = require('../../puppeteer-utils');

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
router.post('/', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body);
    const { name, description, difficulty, html, css, imageWidth, imageHeight } = req.body;
    const challenge = await Challenge.create({
      name,
      description,
      difficulty,
    });

    await Solution.create({
      html,
      css,
      challengeId: challenge.id,
    });
    const newChallenge = {
      name,
      description,
      difficulty,
      html,
      css,
      challengeId: challenge.id,
    };
    // create image and save in db
    await createFiles(html, css, challenge.id, './server/tmp/challenge/');
    const retPathToUserImage = await createImagePreview(
      challenge.id,
      './server/tmp/challenge/',
      Number(imageWidth),
      Number(imageHeight),
    );

    const pathToUserImage = retPathToUserImage.replace('file://', '').replace('.html', '.png');
    await Image.saveImage(
      pathToUserImage,
      challenge.id,
      false,
      Number(imageWidth),
      Number(imageHeight),
    );
    // TODO delete tmp files created in /server/challenge/

    res.send(newChallenge);
  } catch (err) {
    throw new Error(err);
  }
});

router.put('/preview', (req, res, next) => {
  console.log('req.body: ', req.body);
  const { html, css, imageWidth, imageHeight, userId } = req.body;

  // use userId (admin user) to create unique tmp files
  createFiles(html, css, `${userId}-preview`, './dist/images/tmp/');

  createImagePreview(
    `${userId}-preview`,
    './dist/images/tmp/',
    Number(imageWidth),
    Number(imageHeight),
  )
    .then(retPathToUserImage => {
      const pathToUserImage = retPathToUserImage.replace('file://', '').replace('.html', '.png');
      const imageData = fs.readFileSync(pathToUserImage);
      console.log('imageData: ', imageData);
      res.send(JSON.stringify(imageData));
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
