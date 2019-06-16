const router = require('express').Router();
const { Comment } = require('../../db');

router.post('/', (req, res, next) => {
  Comment.create(req.body)
    .then(comment => {
      res.send(comment);
    })
    .catch(next);
});

module.exports = router;
