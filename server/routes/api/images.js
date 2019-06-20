const route = require('express').Router();

const { Challenge, Image } = require('../../db');

/**     /api/images    **/

route.get('/', (req, res, next) => {
  Image.findAll({
    include: [
      {
        model: Challenge,
        required: true,
      },
    ],
  })
    .then(images => {
      res.send(images);
    })
    .catch(next);
});

module.exports = route;
