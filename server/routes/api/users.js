const router = require('express').Router();
const User = require('../../db');

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

// TODO later
// delete
// update

module.exports = router;