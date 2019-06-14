const router = require('express').Router();
const fs = require('fs');
const { Challenge, Image, Comment, Solution, Userchallenge } = require('../../db');
const { createFiles, createImagePreview } = require('../../puppeteer-utils');
const Op = require('../../db/conn').Sequelize.Op;

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
    next(err);
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

router.get('/filter/:difficulty', (req, res, next) => {
  const { difficulty } = req.params;
  const option = JSON.parse(difficulty);
  Challenge.findAll({
    where: option,
    order: [['name', 'asc']],
    include: [Image],
  })
    .then(challenges => res.send(challenges))
    .catch(next);
});

router.get('/search/:term/filter/:difficulty', (req, res, next) => {
  const { difficulty, term } = req.params;
  const option = JSON.parse(difficulty);
  if (option.difficulty === 'all') {
    option.difficulty = { [Op.gt]: 0 };
  }
  Challenge.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${term}%` } },
        { description: { [Op.iLike]: `%${term}%` } },
      ],
      ...option,
    },
    order: [['name', 'asc']],
    include: [Image],
  })
    .then(challenges => res.send(challenges))
    .catch(next);
});

// update a single challenge
router.put('/:id', (req, res, next) => {
  // TODO how to handle req.params.id === NaN ?
  // TODO need to also create image again and update solution
  Challenge.findByPk(Number(req.params.id))
    .then(challenge => challenge.update(req.body))
    .then(updatedChallenge => res.send(updatedChallenge))
    .catch(next);
});

// delete a single challenge
router.delete('/:id', async (req, res, next) => {
  // TODO how to handle req.params.id === NaN ?
  try {
    const challenge = await Challenge.findByPk(Number(req.params.id));
    const challengesTaken = await Userchallenge.findAll({ where: { challengeId: challenge.id } });
    console.log('challengesTaken: ', challengesTaken.length);
    if (!challengesTaken.length) {
      const solution = await Solution.findOne({ where: { challengeId: challenge.id } });
      const image = await Image.findOne({ where: { challengeId: challenge.id } });
      await solution.destroy();
      await image.destroy();
      await challenge.destroy();

      const msg = 'Challenge deleted';
      res.status(204).send(msg);
    } else {
      const msg =
        'Challenge has been taken already, so are not able to Delete.  Click Archive to make it inactive.';
      res.send(msg);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
