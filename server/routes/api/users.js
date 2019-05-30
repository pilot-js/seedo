const router = require('express').Router();
const { User } = require('../../db');
const qs = require('querystring');
const axios = require('axios');

/**     /api/users     **/

// get all users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

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

router.put('/auth/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  })
    .then(user => res.send(user))
    .catch(next);
});

//get github User info
router.get('/github/callback', (req, res, next) => {
  axios
    .post('https://github.com/login/oauth/access_token', {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code,
    })
    .then(response => response.data)
    .then(data => {
      const accessToken = qs.parse(data).access_token;
      return axios.get('https://api.github.com/user', {
        headers: {
          authorization: `token ${accessToken}`,
        },
      });
    })
    .then(response => res.send(response.data))
    .catch(next);
});

module.exports = router;
