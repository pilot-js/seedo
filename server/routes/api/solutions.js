const router = require('express').Router();
const Solution = require('../../db');

/**     /api/solutions     **/

// get single challenge solution
router.get('/:id', (req, res, next) => {
  console.log('params.id: ', req.params.id);
  Solution.findByPk(req.params.id)
    .then(solution => res.send(solution))
    .catch(next);
});

// TODO later for admin
// post
// update
// delete

module.exports = router;
