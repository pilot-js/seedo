const router = require('express').Router();
const qs = require('querystring');
const axios = require('axios');
const { User } = require('../../db');

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
    .then(user => {
      req.session.user = user;
      res.send(user);
    })
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
    .then(response => response.data)
    .then(async githubUser => {
      if (req.session.user) {
        await User.update({ githubId: githubUser.id }, { where: { id: req.session.user.id } });
        req.session.user.githubId = githubUser.id;
        res.redirect('/');
      } else {
        let user = await User.findOne({ where: { githubId: githubUser.id } });
        if (user !== null) {
          req.session.user = user;
          res.redirect('/userpage');
        } else {
          user = await User.create({
            email: githubUser.email,
            password: '1234',
            githubId: githubUser.id,
          });
          req.session.user = user;
          res.redirect('/');
        }
      }
    })
    .catch(next);
});

router.get('/auth/login/github_user', (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.send({});
  }
});

router.delete('/auth/logout', (req, res) => {
  req.session.destroy();
  res.status(204).end();
});

module.exports = router;
