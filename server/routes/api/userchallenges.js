const router = require('express').Router();
const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');

const { Userchallenge } = require('../../db');

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
    .then(userchall => {
      fs.mkdir('./server/tmp', { recursive: true }, err => {
        if (err) throw err;
        console.log('create dir');
      });
      fs.writeFile('./server/tmp/tmp.html', userchall.html, err => {
        if (err) throw err;
        console.log('The html has been saved!');
      });
      fs.writeFile('./server/tmp/tmp.css', userchall.css, err => {
        if (err) throw err;
        console.log('The css has been saved!');
      });
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`file://${path.join(process.cwd(), 'server/tmp/tmp.html')}`);
        await page.setViewport({ width: 100, height: 100 });
        await page.screenshot({ path: './server/tmp/tmp.png' });
        await browser.close();
      })();
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
