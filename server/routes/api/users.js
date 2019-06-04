const router = require('express').Router();
const qs = require('querystring');
const axios = require('axios');
const { User, Userchallenge, Challenge } = require('../../db');

/**     /api/users     **/

// create user (at sign up)
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next);
});

// get user by id
router.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => res.send(user))
    .catch(next);
});

// get a users userchallenges
router.get('/:id/userchallenges/', (req, res, next) => {
  Challenge.findAll({
    include: [{
      model: Userchallenge,
      where: { userId: req.params.id },
    }]
  })
    .then(userChallenges => {
      if (userchallenges) {
        res.send(userChallenges)
      } else {
        res.send([])
      }
    })
    .catch(next)
});

// update user
router.put('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => user.update(req.body))
    .then(updatedUser => res.send(updatedUser))
    .catch(next);
});

// delete user
router.delete('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
