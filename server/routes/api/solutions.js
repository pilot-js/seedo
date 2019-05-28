const router = require('express').Router();
const { Solution } = require('../../db');

/**     /api/solutions     **/

// get a challenge solution
router.get('/:id', (req, res, next) => {
  // TODO how to handle req.params.id === NaN ?
  Solution.findByPk(req.params.id)
    .then(solution => res.send(solution))
    .catch(next);
});

// create a challenge solution
router.post('/:id', (req, res, next) => {
  const { html, css, js } = req.body;
  Solution.create({
    html,
    css,
    js,
  })
    .then(solution => res.send(solution))
    .catch(next);
});

// update a challenge solution
router.put('/:id', (req, res, next) => {
  // TODO how to handle req.params.id === NaN ?
  Solution.findByPk(req.params.id)
    .then(solution => solution.update(req.body))
    .then(updatedSolution => res.send(updatedSolution))
    .catch(next);
});

// delete a challenge solution
router.delete('/:id', (req, res, next) => {
  // TODO how to handle req.params.id === NaN ?
  Solution.findByPk(req.params.id)
    .then(solution => solution.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
