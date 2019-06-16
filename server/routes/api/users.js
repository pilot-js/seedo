const router = require('express').Router();
const qs = require('querystring');
const axios = require('axios');
const { User, Userchallenge, Challenge } = require('../../db');

/**     /api/users     **/

// get all users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

// create user (at sign up)
router.post('/create', (req, res, next) => {
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
    include: [
      {
        where: { userId: req.params.id },
        model: Userchallenge,
      },
    ],
  })
    .then(userChallenges => {
      if (userChallenges) {
        res.send(userChallenges);
      } else {
        res.send([]);
      }
    })
    .catch(next);
});

// update user
router.put('/update/:id', (req, res, next) => {
  console.log('in update route');
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
